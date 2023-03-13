import { storage } from '../storage';
import { stageInterface } from '../interfaces/stageInterface';
import { initialMenu } from '../responses/initialMenu'

export const initialStage = {
  exec(exec: stageInterface) {
    storage[exec.from].stage = 1;

    return initialMenu;
  },
};