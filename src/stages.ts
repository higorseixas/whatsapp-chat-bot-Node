import {
    initialStage,
    stageOne,
    stageTwo,
    stageThree,
    stageFour, 
    stageFive,
    stageEight
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
    },    {
      descricao: 'stageEight',
      stage: stageEight,
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