import { menu } from "../menu";
import { storage } from "../storage";
import { neighborhoods } from "./neighborhoods";
import { stageInterface } from "../interfaces/stageInterface";
import { confirmRegister } from "../responses/confirmRegister";
import { register } from "../responses/register";

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

    return "❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️";
  },
};
