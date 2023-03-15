import { stageInterface } from "../interfaces/stageInterface";
import { storage } from "../storage";
import { userOptions } from "../responses/userOptions";
import { register } from "../responses/register";
import { successRegister } from "../responses/successRegister";
import { UserService } from '../module/user/user.service';
import { cpf } from 'cpf-cnpj-validator'; 

let returnMessage;
let userData;
const userService = new UserService();

export const stageTwo = {
  validateUser(exec: stageInterface) {
    userData = exec.message.replace(/\s+/g, '').split(',');
    if (userData.length < 4) {//validação dos dados
      returnMessage = '❌ *Dados faltantes.* ❌\n' + register;
      return false
    } else if (!cpf.isValid(userData[0].replace(/[^a-zA-Z0-9]/g, ''))) {//validação de CPF
      returnMessage = '❌ *CPF inválido.* ❌\n' + register;
      return false
    } else {
      return true;
    }
  },
  async exec(exec: stageInterface) {
    const validate = this.validateUser(exec)
    if (validate) {
      return await userService.createUser(userData[0], userData[1], userData[2], userData[3])
        .then(() => {
          storage[exec.from].stage = 6;
          return successRegister + userOptions;
        })
        .catch((error) => {
          storage[exec.from].stage = 2;
          return '❌ Usuário já existe na base de dados! ❌\n' + register;
        })
    } else {
      storage[exec.from].stage = 2;
      return returnMessage;
    }
  }
};
