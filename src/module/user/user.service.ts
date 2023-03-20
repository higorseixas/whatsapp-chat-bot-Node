import { PrismaClient } from "@prisma/client"
import { UserInterface } from "../../interfaces/userInterface"

export class UserService {
    constructor(private prisma = new PrismaClient()) { }

    async createUser(requestUser: UserInterface) {
        return await this.getUser(requestUser.cpf)
            .then(async (user) => {
                if (!user) {
                    return await this.prisma.user.create({
                        data: {
                            cpf: requestUser.cpf.replace(/[^a-zA-Z0-9]/g, ''),
                            nome: requestUser.nome,
                            email: requestUser.email,
                            telefone: requestUser.telefone
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error('Erro ao criar usuário!')
                        })
                } else {
                    throw new Error('Usuário já existe na base de dados!')
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error('Erro ao buscar por usuário!')
            })
    }

    async getUser(cpf: string) {
        const user = await this.prisma.user.findUnique({ where: { cpf: cpf } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
        return user;
    }


    async updateUser(requestUser: UserInterface) {
        const cpf = requestUser.cpf
        const nome = requestUser.nome
        const email = requestUser.email
        const telefone = requestUser.telefone
        return await this.getUser(cpf)
            .then(async (user) => {
                if (!user) {
                    throw new Error('Usuário não encontrado!')
                } else {
                    return await this.prisma.user.update({
                        where: { cpf },
                        data: { nome, email, telefone }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async deleteUser(cpf: string) {
        return await this.getUser(cpf)
            .then(async (user) => {
                if (!user) {
                    throw new Error('Usuário não encontrado!')
                } else {
                    return await this.prisma.user.delete({
                        where: {
                            cpf: cpf
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.log(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

}