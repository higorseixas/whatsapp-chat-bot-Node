import { storage } from '../storage';
import { stageInterface } from '../interfaces/stageInterface';
import { initialMenu } from '../responses/initialMenu'

export const initialStage = {
  async exec(exec: stageInterface): Promise<string> {
    storage[exec.from].stage = 1;

    return initialMenu;
  },
};