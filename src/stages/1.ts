import { menu } from "../menu";
import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { register } from "../responses/register";
import { wrongOption } from "../responses/wrongOption";

export const stageOne = {
  exec(exec: stageInterface) {
    if (
      exec.message.toUpperCase() === "SIM" ||
      exec.message.toUpperCase() === "S" ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 2;
      return confirmRegister;
    } else if (
      exec.message.toUpperCase() === "NÃ0" ||
      exec.message.toUpperCase() === "NAO" ||
      exec.message === "2"
    ) {
      storage[exec.from].stage = 3;
      return register;
    }

    return wrongOption;
  },
};
