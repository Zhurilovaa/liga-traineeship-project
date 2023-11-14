import axios from 'axios';
import { urlServer } from 'src/constants/url';
import { PatchTaskParametersType, OptionsRequest, PatchTaskPathType } from 'src/types/apiTasks';

export const patchTaskAxios = (pathParam: PatchTaskPathType, parameters: PatchTaskParametersType) =>
  axios.patch(
    urlServer + `/${pathParam.taskId}`,
    {
      ...parameters,
    },
    OptionsRequest
  );
