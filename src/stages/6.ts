import { storage } from "../storage";
import { stageInterface } from "../interfaces/stageInterface";
import { wrongOption } from "../responses/wrongOption";
import { userOptions } from "../responses/userOptions";
import { requestDate } from "../responses/requestDate";
import { returnBoleto } from "../responses/returnBoleto";
import { confirmDeleteUser } from "../responses/confirmDeleteUser";

export const stageSix = {
  async exec(exec: stageInterface): Promise<string> {
    if (
      exec.message.toUpperCase() === "um"||
      exec.message === "1"
      ) {
      storage[exec.from].stage = 7;
      return returnBoleto;
    } else if (
      exec.message.toUpperCase() === "dois"||
      exec.message === "2"
      ) {
      storage[exec.from].stage = 7;
      return requestDate;
    } else if (
      exec.message.toUpperCase() === "tres"||
      exec.message.toUpperCase() === "três"||
      exec.message === "3"
      ) {
      storage[exec.from].stage = 8;
      return confirmDeleteUser;
    } else {
      storage[exec.from].stage = 6;
      return wrongOption + userOptions;
    }
  },
};
