import * as bcrypt from 'bcrypt';

class GetHash {
  async getHash(password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
  }
}

//const getPasswordHash = new GetHash()
//getPasswordHash.getHash('qwerty')
