import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { wrongOption } from "../responses/wrongOption";
import { finalMessage } from "../responses/finalMessage";
import { confirmFinalDeleteUser } from "../responses/confirmFinalDeleteUser";
import { userOptions } from "../responses/userOptions";
import { UserService } from "../module/user/user.service";

const userService = new UserService();

export const stageEight = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "SIM" ||
      exec.message.toUpperCase() === "S" ||
      exec.message.toUpperCase() === 1 ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 0; //Encerrar operação
      userService.deleteUser(storage.cpf);
      return confirmFinalDeleteUser + finalMessage;
    } else if (      
      exec.message.toUpperCase() === "NÃO" ||
      exec.message.toUpperCase() === "NAO" ||
      exec.message.toUpperCase() === "N" ||
      exec.message.toUpperCase() === 2 ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 6;
      return userOptions;
    } else {
      storage[exec.from].stage = 3;
      return wrongOption + confirmRegister;
    }
  },
};
