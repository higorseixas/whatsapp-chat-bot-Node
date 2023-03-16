import { stageInterface } from "../interfaces/stageInterface";
import { UserService } from "../module/user/user.service";
import { confirmRegister } from "../responses/confirmRegister";
import { userChoisesForCpf } from "../responses/userChoisesForCpf";
import { storage } from "../storage";

const userService = new UserService();

export const stageThree = {
  async exec(exec: stageInterface) {
    const cpf = exec.message;
    if (cpf.isValid(exec.message)) {
      const user = await userService.getUser(exec.message); //Busca no banco de dados o usuário
      if (user) {
        storage[exec.from].stage = 4;
        return `Os dados de usuario correspondente a este CPF, estão corretos (SIM/NÃO)?⬇‍️ \n`+
        `${user.nome}\n` +
        `${user.cpf}\n` +
        `${user.email}\n` +
        `${user.telefone}\n`;
      } else {
        //Deseja se cadastrar ou informar novamente o CPF
        storage[exec.from].stage = 5;
        return     '❌ Usuário não encntrado \n\n' + userChoisesForCpf;
      }
    } else {
      //Usuário digitou algo que não foi aceito como cpf
      storage[exec.from].stage = 3;
      return "❌ Cpf incorreto \n\n" + confirmRegister;
    }
  },
}