import axios from 'axios';
import { urlServer } from 'src/constants/url';
import { AddTaskParametersType, OptionsRequest } from 'src/types/apiTasks';

export const postTaskAxios = (parameters: AddTaskParametersType) =>
  axios.post(
    urlServer,
    {
      ...parameters,
    },
    OptionsRequest
  );
