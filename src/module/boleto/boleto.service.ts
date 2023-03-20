import { Boleto, PrismaClient } from "@prisma/client"
import { BoletoInterface } from "../../interfaces/boletoInterface";

export class BoletoService {
    constructor(private prisma = new PrismaClient()) { }

    async createBoleto(boleto: BoletoInterface) {
        const saoPauloDateTime = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
        return await this.getBoletoByData(boleto.data)
            .then(async (boletos: BoletoInterface[]) => {
                const existeBoleto = boletos.some(dataBoleto => dataBoleto.data === boleto.data)
                if (!existeBoleto) {
                    return await this.prisma.boleto.create({
                        data: {
                            data: boleto.data,
                            userCpf: boleto.userCpf,
                            createdAt: saoPauloDateTime,
                            updatedAt: saoPauloDateTime,
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.error(error)
                            throw new Error('Erro ao cadastrar boleto!')
                        })
                } else {
                    throw new Error('Boleto já está cadastrado na base de dados!')
                }
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error.message)
            })
    }

    async getBoletoByData(data: string) {
        const boletos: BoletoInterface[] = await this.prisma.boleto.findMany({ where: { data: data } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
        return boletos;
    }

    async getBoletoByDate(cpf: string, month: string, year: string) {
        const boletos = await this.prisma.boleto.findMany({ where: { userCpf: cpf } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
        const boleto: Boleto | undefined = boletos.find((element: Boleto) => {
            const boletoDate = element.createdAt.split(' ')[0].split('/')
            const boletoMonth = boletoDate[1]
            const boletoYear = boletoDate[2]
            return (month === boletoMonth && year === boletoYear)
        })
        return boleto
    }

    async getBoletosByUser(userCpf: string) {
        const boletos = await this.prisma.boleto.findMany({ where: { userCpf: userCpf } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
        return boletos;
    }

    async getBoletoByID(id: number) {
        const boleto = await this.prisma.boleto.findUnique({ where: { id: id } })
            .then((result) => result)
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
        return boleto
    }

    async deleteBoleto(id: number) {
        return await this.getBoletoByID(id)
            .then(async (boleto) => {
                if (!boleto) {
                    throw new Error('Boleto não encontrado!')
                } else {
                    return await this.prisma.boleto.delete({
                        where: {
                            id: id
                        }
                    })
                        .then((result) => result)
                        .catch((error) => {
                            console.error(error)
                            throw new Error(error.message)
                        })
                }
            })
            .catch((error) => {
                console.error(error)
                throw new Error(error.message)
            })
    }
}