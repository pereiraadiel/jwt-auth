import bcrypt from 'bcrypt';
import environment from './environment';

const hash = (value : string) => {
  return bcrypt.hash(value, environment.HASH_SALT_ROUNDS)
}

const compare = (value: string, hash: string) => {
  return bcrypt.compare(value, hash);
}

export default {
  hash,
  compare
}