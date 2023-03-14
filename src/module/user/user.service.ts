import { PrismaClient } from "@prisma/client"

export class UserService {
    constructor(private prisma = new PrismaClient()) { }

    async getUser(cpf: string) {
        const user = await this.prisma.user.findUnique({ where: { cpf: '10515154511' } })
            .then((result) => result)
            .catch((error) => console.error(error))
        console.log('userService: ', user);
        return user;
    }
}