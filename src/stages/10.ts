import { stageInterface } from "../interfaces/stageInterface";
import { storage } from "../storage";

export const stageTen = {
    async exec(exec: stageInterface): Promise<string> {
        if (exec.message) {
            storage[exec.from].stage = 0;
            return '';
        }
        return '';
    }
}