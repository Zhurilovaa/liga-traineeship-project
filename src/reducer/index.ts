import { combineReducers } from "redux";
import { ReduxStore } from "types/ReduxStore.types";
import {  ADD_TASK, EDIT_TASK, DELETE_TASK, SET_COMPLETE_TASK, SET_IMPORTANT_TASK } from "constants/reduxActionsType";
import { TaskData } from "types/Task.types";
import { ActionsTask } from "src/actions/ReduxActions";

export const reducerStore = (state: ReduxStore | undefined = {
    tasksListStore: []
  }, 
  action: ActionsTask) => {
  switch (action.type) {
    case ADD_TASK:
      if (action?.taskNew){
        state.tasksListStore.push(action.taskNew)
      }      
      return state;
    case EDIT_TASK:
      if (action?.taskUpdate && action.taskUpdate !== undefined){  
        const idFind = action.taskUpdate.id;      
        // получить индекс Элемента
        const indexUpdate = state.tasksListStore.findIndex((task: TaskData) => task.id === idFind);
        state.tasksListStore[indexUpdate].name = action.taskUpdate.name;
        state.tasksListStore[indexUpdate].info = action.taskUpdate.info;
        state.tasksListStore[indexUpdate].isImportant = action.taskUpdate.isImportant;
        state.tasksListStore[indexUpdate].isCompleted = action.taskUpdate.isCompleted;
      }
      return state;
    case DELETE_TASK:
      //удаление task из state
      // получить индекс Элемента
      const indexDelete = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idTask);
      // записать обе части массива без taskDelete
      const start = state.tasksListStore.slice(0, indexDelete);
      const end = state.tasksListStore.slice(indexDelete + 1, state.tasksListStore.length);
      // соединяем обе части
      state.tasksListStore = start.concat(end);
      return state;
    case SET_IMPORTANT_TASK:
      // получить индекс Элемента
      const indexUpdateImp = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idTask);
      state.tasksListStore[indexUpdateImp].isImportant = !state.tasksListStore[indexUpdateImp].isImportant;
      return state;
    case SET_COMPLETE_TASK:
      // получить индекс Элемента
      const indexUpdateComp = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idTask);
      state.tasksListStore[indexUpdateComp].isCompleted = !state.tasksListStore[indexUpdateComp].isCompleted;
      return state;
    default:
      return state;
  }
};