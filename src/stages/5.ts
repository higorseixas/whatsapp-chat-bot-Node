import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { wrongOption } from "../responses/wrongOption";
import { userChoisesForCpf } from "../responses/userChoisesForCpf";
import { register } from "../responses/register";
import { finalMessage } from "../responses/finalMessage";

export const stageFive = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === 1 ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 3; 
      return confirmRegister;
    } else if (
      exec.message.toUpperCase() === 2 ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 2;
      return register;
    } else if (
      exec.message.toUpperCase() === 3 ||
      exec.message === "3"
    ) {
      storage[exec.from].stage = 0;//Encerrar atendimento 
      return finalMessage;
    } else {
      storage[exec.from].stage = 3;
      return wrongOption + confirmRegister;
    }
  },
};
