import axios from 'axios';
import { urlServer } from 'constants/url';
import { DeleteTaskParametersType } from 'types/apiTasks';

export const deleteTasksAxios = (parameters: DeleteTaskParametersType) =>
  axios.delete(urlServer + `/${parameters.taskId}`);
