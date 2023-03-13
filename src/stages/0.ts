import { storage } from '../storage';
import { stageInterface } from '../interfaces/stageInterface';

export const initialStage = {
  exec(exec: stageInterface) {
    storage[exec.from].stage = 1;

    return '👋 Olá, como vai? \n\nEu sou Carlos, o *assistente virtual* da Delícias da Neide. \n*Posso te ajudar?* 🙋‍♂️ \n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n2️⃣ - ```VERIFICAR TAXA DE ENTREGA```\n0️⃣ - ```FALAR COM ATENDENTE```';
  },
};