import { useConnection } from "@solana/wallet-adapter-react";
import {
  ConfirmedSignatureInfo,
  Connection,
  PublicKey,
  TransactionResponse,
} from "@solana/web3.js";
import { truthy } from "../utils";
import { useEffect, useMemo, useState } from "react";
import { sleep } from "@strata-foundation/spl-utils";

async function getSignatures(
  connection: Connection | undefined,
  address: PublicKey | undefined,
  until: Date | undefined,
  lastSignature: string | undefined,
  maxSignatures: number = 1000
): Promise<ConfirmedSignatureInfo[]> {
  if (!connection || !address) {
    return [];
  }

  const fetchSize = Math.min(1000, maxSignatures);
  const signatures = await connection.getSignaturesForAddress(address, {
    before: lastSignature,
    limit: fetchSize,
  });

  const withinTime = signatures.filter(
    (sig) => (sig.blockTime || 0) > (until?.valueOf() || 0) / 1000
  );

  if (withinTime.length == 1000) {
    return [
      ...withinTime,
      ...(await getSignatures(
        connection,
        address,
        until,
        signatures[signatures.length - 1].signature,
        maxSignatures
      )),
    ];
  }

  return withinTime;
}

type TransactionResponseWithSig = TransactionResponse & { signature: string }

async function retryGetTxn(connection: Connection, sig: string, tries: number = 0): Promise<TransactionResponse> {
  const result = await connection.getTransaction(sig, { commitment: "confirmed" });

  if (result) {
    return result
  }

  if (tries < 5) {
    console.log(`Failed to fetch ${sig}, retrying in 500ms...`)
    await sleep(500);
    console.log(`Retrying ${sig}...`);
    return retryGetTxn(connection, sig, tries + 1)
  }

  throw new Error("Failed to fetch tx with signature " + sig);
}

async function hydrateTransactions(
  connection: Connection | undefined,
  signatures: ConfirmedSignatureInfo[]
): Promise<TransactionResponseWithSig[]> {
  if (!connection) {
    return [];
  }

  const sorted = signatures.sort(
    (a, b) => (b.blockTime || 0) - (a.blockTime || 0)
  );
  return (
    await Promise.all(
      sorted.map(async (s) => {
        const ret = await retryGetTxn(connection, s.signature);
        // @ts-ignore
        ret.signature = s.signature;
        return ret as TransactionResponseWithSig;
      })
    )
  ).filter(truthy);
}

interface ITransactions {
  error: Error | undefined;
  loadingInitial: boolean;
  loadingMore: boolean;
  transactions: TransactionResponseWithSig[];
  fetchMore(num: number): void;
  fetchNew(num: number): void;
}

export const useTransactions = ({
  numTransactions,
  until,
  address,
  subscribe = false
}: {
  numTransactions: number;
  until?: Date;
  address?: PublicKey;
  subscribe?: boolean;
}): ITransactions => {
  const { connection } = useConnection();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [transactions, setTransactions] = useState<
    TransactionResponseWithSig[]
  >([]);
  const addrStr = useMemo(() => address?.toBase58(), [address]);

  useEffect(() => {
    let subId: number;
    if (subscribe && address) {
      subId = connection.onLogs(address, async ({ signature, err }, { slot }) => {
        try {
          const newTxns = await hydrateTransactions(connection, [
            {
              slot,
              signature,
              blockTime: new Date().valueOf() / 1000,
              memo: "",
              err,
            },
          ]);
          setTransactions((txns) => [...newTxns, ...txns]);
        } catch (e: any) {
          console.error("Error while fetching new tx", e)
        }
      }, "confirmed");
    }
    return () => {
      if (subId) {
        connection.removeOnLogsListener(subId);
      }
    }
  }, [subscribe, connection, addrStr, setTransactions]);

  useEffect(() => {
    (async () => {
      setLoadingInitial(true);
      setTransactions([]);
      try {
        const signatures = await getSignatures(
          connection,
          address,
          until,
          undefined,
          numTransactions
        );

        setTransactions(await hydrateTransactions(connection, signatures));
      } catch (e: any) {
        setError(e);
      } finally {
        setLoadingInitial(false);
      }
    })();
  }, [connection, addrStr, until, setTransactions, numTransactions]);

  const fetchMore = async (num: number) => {
    setLoadingMore(true);
    try {
      const lastTx = transactions[transactions.length - 1];
      const signatures = await getSignatures(
        connection,
        address,
        until,
        lastTx && lastTx.transaction.signatures[0],
        num
      );
      const newTxns = await hydrateTransactions(connection, signatures);

      setTransactions((txns) => [...txns, ...newTxns]);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const fetchNew = async (num: number) => {
    setLoadingMore(true);
    try {
      const earlyTx = transactions[0];
      const earlyBlockTime = earlyTx && earlyTx.blockTime;
      let lastDate = until;
      if (earlyBlockTime) {
        const date = new Date(0);
        date.setUTCSeconds(earlyBlockTime);
        lastDate = date;
      }
      const signatures = await getSignatures(
        connection,
        address,
        lastDate,
        undefined,
        num
      );
      const newTxns = await hydrateTransactions(connection, signatures);

      setTransactions((txns) => [...newTxns, ...txns]);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoadingMore(false);
    }
  };
  return {
    transactions,
    error,
    loadingInitial,
    loadingMore,
    fetchMore,
    fetchNew,
  };
};
