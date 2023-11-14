import { TaskData } from 'src/types/Task.types';
import {
  GetTasksResponseType,
  GetTaskByIdResponseType,
  PostTaskResponseType,
  PatchTaskResponseType,
} from 'src/types/apiTasks';

// Преобразование данных
export const mapGetAllTask = (tasksFromResponse: GetTasksResponseType): TaskData[] => {
  const resultTaskList: TaskData[] = [];
  tasksFromResponse.map((task) => {
    resultTaskList.push(taskResponseToTaskData(task));
  });
  return resultTaskList;
};

export const taskResponseToTaskData = (
  taskFromResponse: GetTaskByIdResponseType | PostTaskResponseType | PatchTaskResponseType
): TaskData => {
  return {
    id: taskFromResponse['id'] || 0,
    name: String(taskFromResponse['name']) || '',
    info: String(taskFromResponse['info']) || '',
    isImportant: Boolean(taskFromResponse['isImportant']) || false,
    isCompleted: Boolean(taskFromResponse['isCompleted']) || false,
  };
};
