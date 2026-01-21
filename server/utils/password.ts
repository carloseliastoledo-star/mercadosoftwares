import crypto from 'crypto'

const SCRYPT_N = 16384
const SCRYPT_R = 8
const SCRYPT_P = 1
const KEY_LEN = 64

function randomSalt(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex')
}

export function hashPassword(password: string) {
  const salt = randomSalt()
  const derived = crypto.scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P
  })

  return `scrypt$${salt}$${derived.toString('hex')}`
}

export function verifyPassword(password: string, stored: string) {
  const parts = stored.split('$')
  if (parts.length !== 3) return false

  const [algo, salt, expectedHex] = parts
  if (algo !== 'scrypt') return false

  const derived = crypto.scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P
  })

  const derivedHex = derived.toString('hex')
  try {
    return crypto.timingSafeEqual(Buffer.from(derivedHex, 'hex'), Buffer.from(expectedHex, 'hex'))
  } catch {
    return false
  }
}
