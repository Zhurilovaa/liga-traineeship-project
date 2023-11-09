import { DELETE_TASK, SET_COMPLETE_TASK, SET_IMPORTANT_TASK } from "constants/reduxActionsType";
import { TaskData } from "types/Task.types";
import { ReduxStore } from "types/ReduxStore.types";
import { ActionsTask } from "src/actions/ReduxActions";

// export const taskListReducer = (state: ReduxStore = {
//   tasksListStore: []
// }, action: ActionsTask) => {
//     switch (action.type) {
//       case DELETE_TASK:
//         //удаление task из state
//         // получить индекс Элемента
//         const indexDelete = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idDeleteTask);
//         // записать обе части массива без taskDelete
//         const start = state.tasksListStore.slice(0, indexDelete);
//         const end = state.tasksListStore.slice(indexDelete + 1, state.tasksListStore.length);
//         // соединяем обе части
//         state.tasksListStore = start.concat(end);
//         return state;
//       case SET_IMPORTANT_TASK:
//         // получить индекс Элемента
//         const indexUpdateImp = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idImportantTask);
//         state.tasksListStore[indexUpdateImp].isImportant = !state.tasksListStore[indexUpdateImp].isImportant;
//         return state;
//       case SET_COMPLETE_TASK:
//         // получить индекс Элемента
//         const indexUpdateComp = state.tasksListStore.findIndex((task: TaskData) => task.id === action.idCompleteTask);
//         state.tasksListStore[indexUpdateComp].isCompleted = !state.tasksListStore[indexUpdateComp].isCompleted;
//         return state;
//       default:
//         return state;
//     }
// };