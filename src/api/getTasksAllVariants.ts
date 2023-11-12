import axios from 'axios';
import { boolean } from 'yup';
import { urlServer } from 'constants/url';
import { TaskData } from 'types/Task.types';
import { GetTaskResponse } from 'types/apiTasks';

// 1) Получить все таски. Без фильтров и поиска
export const getAllTasks = (): Promise<GetTaskResponse> => axios.get(urlServer);

// Преобразование данных
export const mapGetAllTask = (tasksFromResponse: GetTaskResponse): TaskData[] => {
  const resultTaskList: TaskData[] = [];
  console.log(typeof tasksFromResponse);
  tasksFromResponse.map((task) => {
    resultTaskList.push({
      id: task['id'] || 0,
      name: task['name'] || '',
      info: task['info'] || '',
      isImportant: (task['isImportant'] && typeof task['isImportant'] === 'boolean') || false,
      isCompleted: task['isCompleted'] || false,
    });
  });
  return resultTaskList;
};
