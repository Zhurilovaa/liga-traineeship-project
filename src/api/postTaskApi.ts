import axios from 'axios';
import { urlServer } from '../constants/url';
import { AddTaskParametersType, OptionsRequest } from '../types/apiTasks';

export const postTaskAxios = (parameters: AddTaskParametersType) =>
  axios.post(
    urlServer,
    {
      ...parameters,
    },
    OptionsRequest
  );
