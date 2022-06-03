"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGovernance = void 0;
const spl_governance_1 = require("@solana/spl-governance");
const web3_js_1 = require("@solana/web3.js");
const hooks_1 = require("../hooks");
function govParser(pubkey, account) {
    const parse = (0, spl_governance_1.GovernanceAccountParser)(spl_governance_1.Governance);
    if (account.owner.equals(new web3_js_1.PublicKey("GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw"))) {
        return parse(pubkey, account).account;
    }
}
function useGovernance(governance) {
    return (0, hooks_1.useAccount)(governance, govParser);
}
exports.useGovernance = useGovernance;
//# sourceMappingURL=useGovernance.js.map