import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { wrongOption } from "../responses/wrongOption";
import { userOptions } from "../responses/userOptions";
import { requestDate } from "../responses/requestDate";
import { returnBoleto } from "../responses/returnBoleto";
import { confirmDeleteUser } from "../responses/confirmDeleteUser";
import { BoletoService } from "../module/boleto/boleto.service";
import { numberToMonth } from "../utils/numberToMonth";

const boletoService = new BoletoService()

export const stageSix = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "um" ||
      exec.message === "1"
    ) {
      const boletos = await boletoService.getBoletosByUser(storage.cpf)
      storage.base64 = boletos[boletos.length - 1].data
      storage.fileName = 'Boleto ' +
        numberToMonth(boletos[boletos.length - 1].createdAt.split(' ')[0].split('/')[1]) + ' ' +
        boletos[boletos.length - 1].createdAt.split(' ')[0].split('/')[2] +
        '.pdf'
      storage[exec.from].stage = 9;
      return returnBoleto;

    } else if (
      exec.message.toUpperCase() === "DOIS" ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 7;
      return requestDate;
    } else if (
      exec.message.toUpperCase() === "TRES" ||
      exec.message.toUpperCase() === "TRÊS" ||
      exec.message === "3"
    ) {
      storage[exec.from].stage = 8;
      return confirmDeleteUser;
    } else {
      storage[exec.from].stage = 6;
      return wrongOption + userOptions;
    }
  },
};
