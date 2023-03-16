import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { wrongOption } from "../responses/wrongOption";
import { userChoisesForCpf } from "../responses/userChoisesForCpf";

export const stageFour = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "SIM" ||
      exec.message.toUpperCase() === "S" ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 6; //userOptions
      return confirmRegister;
    } else if (
      exec.message.toUpperCase() === "NÃ0" ||
      exec.message.toUpperCase() === "NAO" ||
      exec.message.toUpperCase() === "N" ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 5;
      return userChoisesForCpf;
    } else {
      storage[exec.from].stage = 3;
      return wrongOption + confirmRegister;
    }
  },
};
