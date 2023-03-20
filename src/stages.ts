import {
    initialStage,
    stageOne,
    stageTwo,
    stageThree,
    stageFour, 
    stageFive,
    stageSix,
    stageEight,
    stageNine,
  } from './stages/index';
  
  import { storage } from './storage';
  
  export const stages = [
    {
      descricao: 'initialStage',
      stage: initialStage,
    },
    {
      descricao: 'stageOne',
      stage: stageOne,
    },
    {
      descricao: 'stageTwo',
      stage: stageTwo,
    },
    {
      descricao: 'stageThree',
      stage: stageThree,
    },{
      descricao: 'stageFour',
      stage: stageFour,
    },
    {
      descricao: 'stageFive',
      stage: stageFive,
    },
    {
      descricao: 'stageSix',
      stage: stageSix,
    },
    {
      descricao: 'stageEight',
      stage: stageEight,
    },
    {
      descricao: 'stageNine',
      stage: stageNine,
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