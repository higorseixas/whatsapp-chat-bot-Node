import {
    initialStage,
    stageOne,
    stageTwo,
    stageThree,
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
      descricao: 'Register',
      stage: stageThree,
    },
  ];
  
  export function getStage({ from }) {
    if (storage[from]) {
      return storage[from].stage;
    }
    storage[from] = {
      stage: 0,
    };
  
    return storage[from].stage;
  }