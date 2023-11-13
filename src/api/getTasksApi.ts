import axios from 'axios';
import { urlServer } from 'constants/url';
import { TaskData } from 'types/Task.types';
import { GetTasksResponse, GetTaskParameters } from 'types/apiTasks';

export const getTasksAxios = (parameters: GetTaskParameters) =>
  axios.get(urlServer, {
    params: {
      ...parameters,
    },
  });

// Преобразование данных
export const mapGetAllTask = (tasksFromResponse: GetTasksResponse): TaskData[] => {
  const resultTaskList: TaskData[] = [];
  console.log(typeof tasksFromResponse);
  tasksFromResponse.map((task) => {
    resultTaskList.push({
      id: task['id'] || 0,
      name: String(task['name']) || '',
      info: String(task['info']) || '',
      isImportant: Boolean(task['isImportant']) || false,
      isCompleted: Boolean(task['isCompleted']) || false,
    });
  });
  return resultTaskList;
};
