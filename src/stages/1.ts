import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { register } from "../responses/register";
import { wrongOption } from "../responses/wrongOption";

export const stageOne = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "SIM" ||
      exec.message.toUpperCase() === "S" ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 3;
      return confirmRegister;
    } else if (
      exec.message.toUpperCase() === "NÃO" ||
      exec.message.toUpperCase() === "NAO" ||
      exec.message.toUpperCase() === "N" ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 2;
      return register;
    }

    return wrongOption;
  },
};
