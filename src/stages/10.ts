import { stageInterface } from "../interfaces/stageInterface";
import { initialMenu } from "../responses/initialMenu";
import { storage } from "../storage";

export const stageTen = {
    async exec(exec: stageInterface): Promise<string> {
        storage[exec.from].stage = 0;
        return initialMenu;
    }
}