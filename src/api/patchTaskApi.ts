import axios from 'axios';
import { urlServer } from '../constants/url';
import { PatchTaskParametersType, OptionsRequest, PatchTaskPathType } from '../types/apiTasks';

export const patchTaskAxios = (pathParam: PatchTaskPathType, parameters: PatchTaskParametersType) =>
  axios.patch(
    urlServer + `/${pathParam.taskId}`,
    {
      ...parameters,
    },
    OptionsRequest
  );
