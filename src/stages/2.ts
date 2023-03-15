import { stageInterface } from "../interfaces/stageInterface";
import { storage } from "../storage";
import { userOptions } from "../responses/userOptions";
import { register } from "../responses/register";
import { successRegister } from "../responses/successRegister";

let returnMessage;

export const stageTwo = {
  validateUser(exec: stageInterface) {
    const data = exec.message.replace(/\s+/g, '').split(',');
    if (data.length < 4) {//validação dos dados
      returnMessage = '❌ *Dados faltantes.* ❌\n' + register;
      return false
    } else if (data[0] !== '22222222') {//validação de CPF
      returnMessage = '❌ *CPF inválido.* ❌\n' + register;
      return false
    } else {
      return true;
    }
  },
  exec(exec: stageInterface) {
    const validate = this.validateUser(exec)
    if (validate) {
      storage[exec.from].stage = 6;
      //cadastrar usuário no banco
      return successRegister + userOptions;
    } else {
      storage[exec.from].stage = 2;
      return returnMessage;
    }
  }
};
