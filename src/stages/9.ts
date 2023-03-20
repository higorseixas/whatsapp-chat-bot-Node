import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { wrongOption } from "../responses/wrongOption";
import { finalMessage } from "../responses/finalMessage";
import { userOptions } from "../responses/userOptions";
import { userFinalChoises } from "../responses/userFinalChoises";

export const stageNine = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "SIM" ||
      exec.message.toUpperCase() === "S" ||
      exec.message.toUpperCase() === 1 ||
      exec.message === "1"
    ) {
      storage[exec.from].stage = 6;
      return userOptions;
    } else if (      
      exec.message.toUpperCase() === "NÃO" ||
      exec.message.toUpperCase() === "NAO" ||
      exec.message.toUpperCase() === "N" ||
      exec.message.toUpperCase() === 2 ||
      exec.message === "2"
    ) {
      storage.cpf = ''
      storage[exec.from].stage = 10;
      return finalMessage;
    } else {
      storage[exec.from].stage = 9;
      return wrongOption + userFinalChoises;
    }
  },
};
