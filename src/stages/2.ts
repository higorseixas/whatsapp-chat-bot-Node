import { menu } from '../menu';
import { storage } from '../storage';
import { stageInterface } from '../interfaces/stageInterface';

export const stageTwo = {
  exec(exec: stageInterface) {
    const order =
      '\n-----------------------------------\n#️⃣ - ```FINALIZAR pedido``` \n*️⃣ - ```CANCELAR pedido```';
    if (exec.message === '*') {
      storage[exec.from].stage = 0;
      storage[exec.from].itens = [];

      return '🔴 Pedido *CANCELADO* com sucesso. \n\n ```Volte Sempre!```';
    } else if (exec.message === '#') {
      storage[exec.from].stage = 3;

      return (
        '🗺️ Agora, informe o *ENDEREÇO*. \n ( ```Rua, Número, Bairro``` ) \n\n ' +
        '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```'
      );
    } else {
      if (!menu[exec.message]) {
        return `❌ *Código inválido, digite novamente!* \n\n ${order}`;
      }
    }

    storage[exec.from].itens.push(menu[exec.message]);

    return (
      `✅ *${menu[exec.message].description}* adicionado com sucesso! \n\n` +
      '```Digite outra opção```: \n\n' +
      order
    );
  },
};