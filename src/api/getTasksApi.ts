import axios from 'axios';
import { urlServer } from 'src/constants/url';
import { GetTaskParametersType, GetTaskByIdParametersType } from 'src/types/apiTasks';

export const getTasksAxios = (parameters: GetTaskParametersType) =>
  axios.get(urlServer, {
    params: {
      ...parameters,
    },
  });

export const getTaskByIdAxios = (parameters: GetTaskByIdParametersType) =>
  axios.get(urlServer + '/' + parameters.taskId);
