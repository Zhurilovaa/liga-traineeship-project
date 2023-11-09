import { store } from "src/store";
import { TaskData } from "types/Task.types";
import { ADD_TASK, EDIT_TASK, DELETE_TASK, SET_IMPORTANT_TASK, SET_COMPLETE_TASK } from "constants/reduxActionsType";

export interface ActionsTask {
    type: string,
    taskNew?: TaskData,
    taskUpdate?: TaskData,
    idTask?: number,
}

// AddTask action
// actions creators
export const addTask = (taskNew: TaskData) =>  ({type: ADD_TASK, taskNew});

export const addTaskDispatch = (taskNew: TaskData) => {
    store.dispatch({type: ADD_TASK, taskNew});
}

// EditTask action
// actions creators
export const editTask = (taskUpdate: TaskData) =>  ({type: EDIT_TASK, taskUpdate});

export const editTaskDispatch = (taskUpdate: TaskData) => {
    store.dispatch({type: EDIT_TASK, taskUpdate});
}

// DeleteTask action
// actions creators
export const deleteTask = (idTask: number) =>  ({type: DELETE_TASK, idTask});

export const deleteTaskDispatch = (idTask: number) => {
    store.dispatch({type: DELETE_TASK, idTask});
}

// SetImportantTask action
// actions creators
export const setImportantTask = (idTask: number) =>  ({type: SET_IMPORTANT_TASK, idTask});

export const setImportantTaskDispatch = (idTask: number) => {
    store.dispatch({type: SET_IMPORTANT_TASK, idTask});
}

// SetCompleteTask action
// actions creators
export const setCompleteTask = (idTask: number) =>  ({type: SET_COMPLETE_TASK, idTask});

export const setCompleteTaskDispatch = (idTask: number) => {
    store.dispatch({type: SET_COMPLETE_TASK, idTask});
}