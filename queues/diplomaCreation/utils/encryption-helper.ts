// encryption.js
import crypto from 'crypto'
import { ENCRYPTION_METHOD, ENCYPTION_SECRET_IV_KEY, ENCYPTION_SECRET_KEY } from './constants.js'

// Generate secret hash with crypto to use for encryption
const key = crypto
    .createHash('sha512')
    .update(ENCYPTION_SECRET_KEY)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(ENCYPTION_SECRET_IV_KEY)
    .digest('hex')
    .substring(0, 16)

// Encrypt data
export function encryptData (data: string) {
    const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decryptData (encryptedData: string) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) // Decrypts data and converts to utf8
}