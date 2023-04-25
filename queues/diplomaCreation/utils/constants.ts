import ABI from "../../../smart-contract/build/contracts/DiplomaContract.json";

export const CONTRACT_ADDRESS = "0x2376733b5Faf11b8101CF55b00b0B9E534013120";

export const CONTRACT_ABI = ABI.abi;

export const CONTRACT_OWNER = "0x4109C12d814CE5CaB03d44281F0cE0BAb0B09cBF";

export const ENCYPTION_SECRET_KEY = process.env.SECRET_KEY || "secretRandomShitThatNoOneKnows#1"

export const ENCYPTION_SECRET_IV_KEY = process.env.SECRET_IV_KEY || "secretRandomShitThatNoOneKnows#2"

export const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD || "aes-256-cbc"