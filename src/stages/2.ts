import { stageInterface } from "../interfaces/stageInterface";
import { storage } from "../storage";
import { userOptions } from "../responses/userOptions";
import { register } from "../responses/register";

export const stageTwo = {
  validateUser(message: string) {
    const dados = message.split(',')
    console.log(dados);
    return true;
  },
  exec(exec: stageInterface) {
    if (this.validateUser(exec.message)) {
      storage[exec.from].stage = 6;
      //cadastrar usuário no banco
      
      return userOptions;
    }else{
      storage[exec.from].stage = 3;
      return register
    }
  },
};
