import {  ADD_TASK, EDIT_TASK } from "constants/reduxActionsType";
import { TaskData } from "types/Task.types";
import { ReduxStore } from "types/ReduxStore.types";
import { ActionsTask } from "src/actions/ReduxActions";

export const taskFormReducer = (state: ReduxStore | undefined = {
    tasksListStore: []
  }, 
  action: ActionsTask)=> {
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
      default:
        return state;
    }
};