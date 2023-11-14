import axios from 'axios';
import { urlServer } from 'src/constants/url';
import { DeleteTaskPathType } from 'src/types/apiTasks';

export const deleteTasksAxios = (parameters: DeleteTaskPathType) => axios.delete(urlServer + `/${parameters.taskId}`);
