import ABI from "../../../smart-contract/build/contracts/DiplomaContract.json";

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xD097Dd3157134500433E0D45dcF093F47391c0Dc";

export const CONTRACT_ABI = ABI.abi;

export const CONTRACT_OWNER = process.env.CONTRACT_OWNER || "0x4109C12d814CE5CaB03d44281F0cE0BAb0B09cBF";

export const ENCYPTION_SECRET_KEY = process.env.SECRET_KEY || "secretRandomShitThatNoOneKnows#1"

export const ENCYPTION_SECRET_IV_KEY = process.env.SECRET_IV_KEY || "secretRandomShitThatNoOneKnows#2"

export const ENCRYPTION_METHOD = process.env.ENCRYPTION_METHOD || "aes-256-cbc"

export const WEB3_API = process.env.WEB3_API || "http://localhost:7545"