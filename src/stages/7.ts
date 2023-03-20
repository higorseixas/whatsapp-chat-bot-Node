import { Boleto } from "@prisma/client";
import { stageInterface } from "../interfaces/stageInterface";
import { BoletoService } from "../module/boleto/boleto.service";
import { boletoNotFound } from "../responses/boletoNotFound";
import { returnBoleto } from "../responses/returnBoleto";
import { userFinalChoises } from "../responses/userFinalChoises";
import { userOptions } from "../responses/userOptions";
import { storage } from "../storage";
import { numberToMonth } from "../utils/numberToMonth";

const boleto = new BoletoService()

export const stageSeven = {
    async exec(exec: stageInterface): Promise<string> {
        const data: string[] = exec.message.split('/')
        const month = data[0]
        const year = data[1]
        const boletoDate: Boleto | undefined = await boleto.getBoletoByDate(storage.cpf, month, year)
        if (boletoDate) {
            storage.base64 = boletoDate.data
            storage.fileName = 'Boleto ' +
                numberToMonth(boletoDate.createdAt.split(' ')[0].split('/')[1]) + ' ' +
                boletoDate.createdAt.split(' ')[0].split('/')[2] +
                '.pdf'
            storage[exec.from].stage = 9;    
            return returnBoleto + userFinalChoises;
        } else {
            storage[exec.from].stage = 9;
            return boletoNotFound + userFinalChoises;
        }
    }
}