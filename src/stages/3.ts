import { stageInterface } from "../interfaces/stageInterface";
import { UserService } from "../module/user/user.service";
import { confirmRegister } from "../responses/confirmRegister";
import { userChoisesForCpf } from "../responses/userChoisesForCpf";
import { storage } from "../storage";
import { cpf } from "cpf-cnpj-validator";

const userService = new UserService();

export const stageThree = {
  async exec(exec: stageInterface) {
    const cpfEnviado = exec.message;
    if (cpf.isValid(cpfEnviado.replace(/[^a-zA-Z0-9]/g, ''))) {
      const user = await userService.getUser(exec.message); //Busca no banco de dados o usuário
      if (user) {
        storage.cpf = user.cpf;
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