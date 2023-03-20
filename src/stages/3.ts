import { stageInterface } from "../interfaces/stageInterface";
import { UserService } from "../module/user/user.service";
import { confirmRegister } from "../responses/confirmRegister";
import { userChoisesForCpf } from "../responses/userChoisesForCpf";
import { storage } from "../storage";
import { cpf } from "cpf-cnpj-validator";
import { confirmInformations } from "../responses/confirmInformations";

const userService = new UserService();

export const stageThree = {
  async exec(exec: stageInterface) {
    const cpfEnviado = exec.message;
    if (cpf.isValid(cpfEnviado.replace(/[^a-zA-Z0-9]/g, ''))) {
      const user = await userService.getUser(exec.message); //Busca no banco de dados o usuário
      if (user) {
        storage.cpf = user.cpf;
        storage[exec.from].stage = 4;
        return confirmInformations(user.nome, user.cpf, user.email, user.telefone);
      } else {
        //Deseja se cadastrar ou informar novamente o CPF
        storage[exec.from].stage = 5;
        return     '❌ Usuário não encontrado ❌\n\n' + userChoisesForCpf;
      }
    } else {
      //Usuário digitou algo que não foi aceito como cpf
      storage[exec.from].stage = 3;
      return "❌ Cpf incorreto ❌\n\n" + confirmRegister;
    }
  },
}