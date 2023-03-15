import { stageInterface } from "../interfaces/stageInterface";
import { UserService } from "../module/user/user.service";
import { confirmRegister } from "../responses/confirmRegister";
import { userNotFound } from "../responses/userNotFound";
import { storage } from "../storage";

const userService = new UserService();

export const stageThree = {
  async validateCPF(cpf: string) {
    return true;
  },
  async exec(exec: stageInterface) {
    if (await this.validateCPF(exec.message)) {
      //Busar no banco de dados o usuário
      const user = await userService.getUser(exec.message);
      if (user) {
        storage[exec.from].stage = 4;
        return `O nome correspondente a este CPF, está correto?⬇‍️ \n ${user.nome}`;
      } else {
        //Deseja se cadastrar ou informar novamente o CPF
        storage[exec.from].stage = 5;
        return userNotFound;
      }
    } else {
      //Usuário digitou algo que não foi aceito como cpf
      storage[exec.from].stage = 3;
      return "❌ Cpf incorreto \n\n" + confirmRegister;
    }
  },
}