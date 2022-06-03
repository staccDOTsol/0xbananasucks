"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const sdk_1 = require("@orca-so/sdk");
const nodewallet_1 = __importDefault(require("@project-serum/anchor/dist/cjs/nodewallet"));
const sdk_2 = require("@shadow-drive/sdk");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const bn_js_1 = __importDefault(require("bn.js"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const PROGRAM_ID = new web3_js_1.PublicKey("2e1wdyNhUvE76y6yUCvah2KaviavMJYKoRun8acMRBZZ");
const SHDW = new web3_js_1.PublicKey("SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y");
function getStorageAccount(key, accountSeed) {
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("storage-account"),
        key.toBytes(),
        accountSeed.toTwos(2).toArrayLike(Buffer, "le", 4),
    ], PROGRAM_ID);
}
function getOwnedAmount(provider, wallet, mint) {
    return __awaiter(this, void 0, void 0, function* () {
        const ata = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, mint, wallet, true);
        const mintAcc = yield (0, spl_utils_1.getMintInfo)(provider, mint);
        const acct = yield provider.connection.getAccountInfo(ata, "confirmed");
        if (acct) {
            return (0, spl_token_bonding_1.toNumber)(spl_token_1.u64.fromBuffer(spl_token_1.AccountLayout.decode(acct.data).amount), mintAcc);
        }
        return 0;
    });
}
function uploadFile(provider, file, delegateWallet) {
    return __awaiter(this, void 0, void 0, function* () {
        if (provider) {
            const pubKey = delegateWallet ? delegateWallet.publicKey : provider.wallet.publicKey;
            const shdwDrive = new sdk_2.ShdwDrive(
            // @ts-ignore
            new web3_js_1.Connection(provider.connection._rpcEndpoint, "max"), delegateWallet ? new nodewallet_1.default(delegateWallet) : provider.wallet);
            const orca = (0, sdk_1.getOrca)(provider.connection);
            const orcaSolPool = orca.getPool(sdk_1.OrcaPoolConfig.SHDW_SOL);
            const [accountKey] = yield getStorageAccount(pubKey, new bn_js_1.default(0));
            let storageAccount;
            try {
                storageAccount = yield shdwDrive.getStorageAccount(accountKey);
            }
            catch (e) {
                // ignore
            }
            // Double storage size every time there's not enough
            let sizeKB = 0;
            if (storageAccount && Number(storageAccount.storageAvailable) < file.size) {
                let sizeToAdd = storageAccount.storageAvailable;
                while (sizeToAdd < file.size) {
                    sizeToAdd += sizeToAdd;
                }
                sizeKB = Math.ceil(sizeToAdd / 1024);
            }
            else if (!storageAccount) {
                sizeKB = Math.ceil(file.size / 1024);
            }
            const shdwNeeded = (sizeKB * 1024) / Math.pow(10, 9);
            const solToken = orcaSolPool.getTokenB();
            const shdwToken = orcaSolPool.getTokenA();
            const shdwOwnedAmount = yield getOwnedAmount(provider, pubKey, SHDW);
            if (shdwOwnedAmount < shdwNeeded) {
                console.log("Not enough SHDW, buying some...");
                const quote = yield orcaSolPool.getQuote(shdwToken, new decimal_js_1.default(Math.max(shdwNeeded * 1.1, Math.pow(10, -9))) // Add 5% more than we need
                );
                const swapPayload = yield orcaSolPool.swap(pubKey, solToken, quote.getExpectedOutputAmount(), new decimal_js_1.default(shdwNeeded));
                const tx = swapPayload.transaction;
                tx.recentBlockhash = (yield provider.connection.getRecentBlockhash()).blockhash;
                tx.feePayer = pubKey;
                const signers = [...swapPayload.signers, delegateWallet].filter(spl_utils_1.truthy);
                tx.sign(...signers);
                yield (0, spl_utils_1.sendAndConfirmWithRetry)(provider.connection, tx.serialize(), {}, "confirmed");
            }
            yield shdwDrive.init();
            if (storageAccount && sizeKB) {
                yield shdwDrive.addStorage(accountKey, sizeKB + "KB");
            }
            else if (!storageAccount) {
                yield shdwDrive.createStorageAccount("chat", sizeKB + "KB");
            }
            const ext = file.name.split(".").slice(1, -1).join(".");
            const name = randomIdentifier() + (ext ? `.${ext}` : "");
            console.log(name);
            Object.defineProperty(file, "name", {
                writable: true,
                value: name,
            });
            const res = yield shdwDrive.uploadFile(accountKey, file);
            return res.finalized_location;
        }
    });
}
exports.uploadFile = uploadFile;
function randomIdentifier() {
    return Math.random().toString(32).slice(2);
}
//# sourceMappingURL=shdw.js.map