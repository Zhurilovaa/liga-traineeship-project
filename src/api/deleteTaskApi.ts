import axios from 'axios';
import { urlServer } from '../constants/url';
import { DeleteTaskPathType } from '../types/apiTasks';

export const deleteTasksAxios = (parameters: DeleteTaskPathType) => axios.delete(urlServer + `/${parameters.taskId}`);
