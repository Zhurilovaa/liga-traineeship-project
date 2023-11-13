import axios from 'axios';
import { urlServer } from 'constants/url';
import { DeleteTaskParameters } from 'types/apiTasks';

export const deleteTasksAxios = (parameters: DeleteTaskParameters) =>
  axios.delete(urlServer, {
    data: {
      ...parameters,
    },
  });
