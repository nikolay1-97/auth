import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';


class GetHash {
    constructor(private readonly configService: ConfigService) {}
    async getHash(password: string) {
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash)
    }
}

const getPasswordHash = new GetHash(new ConfigService())
getPasswordHash.getHash('qwerty')