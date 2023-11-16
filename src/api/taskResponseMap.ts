import { TaskData } from '../types/Task.types';
import {
  GetTasksResponseType,
  GetTaskByIdResponseType,
  PostTaskResponseType,
  PatchTaskResponseType,
} from '../types/apiTasks';

// Преобразование данных
export const mapGetAllTask = (tasksFromResponse: GetTasksResponseType): TaskData[] => {
  const resultTaskList: TaskData[] = [];
  tasksFromResponse.forEach((task) => {
    resultTaskList.push(taskResponseToTaskData(task));
  });
  return resultTaskList;
};

export const taskResponseToTaskData = (
  taskFromResponse: GetTaskByIdResponseType | PostTaskResponseType | PatchTaskResponseType
): TaskData => {
  // Поправка на случай "false" -> false
  if (typeof taskFromResponse.isImportant === 'string' && taskFromResponse.isImportant === 'false') {
    taskFromResponse.isImportant = false;
  }
  if (typeof taskFromResponse.isCompleted === 'string' && taskFromResponse.isCompleted === 'false') {
    taskFromResponse.isCompleted = false;
  }
  return {
    id: taskFromResponse['id'] || 0,
    name: String(taskFromResponse['name']) || '',
    info: String(taskFromResponse['info']) || '',
    isImportant: Boolean(taskFromResponse['isImportant']) || false,
    isCompleted: Boolean(taskFromResponse['isCompleted']) || false,
  };
};
