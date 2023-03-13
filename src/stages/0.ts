import { storage } from '../storage';
import { stageInterface } from '../interfaces/stageInterface';
import { menuInicial } from '../responses/menuInicial'

export const initialStage = {
  exec(exec: stageInterface) {
    storage[exec.from].stage = 1;

    return menuInicial;
  },
};