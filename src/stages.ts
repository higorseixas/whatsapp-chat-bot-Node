import {
    initialStage,
    stageOne,
    stageTwo,
  } from './stages/index';
  
  import { storage } from './storage';
  
  export const stages = [
    {
      descricao: 'Welcome',
      stage: initialStage,
    },
    {
      descricao: 'Menu',
      stage: stageOne,
    },
    {
      descricao: 'Address',
      stage: stageTwo,
    },
    {
      descricao: 'Cadastro',
      stage: stageTwo,
    },
  ];
  
  export function getStage({ from }) {
    if (storage[from]) {
      return storage[from].stage;
    }
    storage[from] = {
      stage: 0,
      itens: [],
      address: '',
    };
  
    return storage[from].stage;
  }