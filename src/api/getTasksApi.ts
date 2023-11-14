import axios from 'axios';
import { urlServer } from 'constants/url';
import { TaskData } from 'types/Task.types';
import {
  GetTasksResponseType,
  GetTaskParametersType,
  GetTaskByIdParametersType,
  GetTaskByIdResponseType,
} from 'types/apiTasks';

export const getTasksAxios = (parameters: GetTaskParametersType) =>
  axios.get(urlServer, {
    params: {
      ...parameters,
    },
  });

export const getTaskByIdAxios = (parameters: GetTaskByIdParametersType) =>
  axios.get(urlServer + '/' + parameters.taskId);

// Преобразование данных
export const mapGetAllTask = (tasksFromResponse: GetTasksResponseType): TaskData[] => {
  const resultTaskList: TaskData[] = [];
  tasksFromResponse.map((task) => {
    resultTaskList.push(taskResponseToTaskData(task));
  });
  return resultTaskList;
};

export const taskResponseToTaskData = (taskFromResponse: GetTaskByIdResponseType): TaskData => {
  return {
    id: taskFromResponse['id'] || 0,
    name: String(taskFromResponse['name']) || '',
    info: String(taskFromResponse['info']) || '',
    isImportant: Boolean(taskFromResponse['isImportant']) || false,
    isCompleted: Boolean(taskFromResponse['isCompleted']) || false,
  };
};
