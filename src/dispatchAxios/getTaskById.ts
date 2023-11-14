import axios, { AxiosResponse } from 'axios';

import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';
import { GetTaskByIdParametersType, GetTaskByIdResponseType } from 'src/types/apiTasks';
import { TaskData } from 'src/types/Task.types';
import { getTaskByIdAxios } from 'src/api/getTasksApi';
import { taskResponseToTaskData } from 'src/api/taskResponseMap';
import { AppDispatch } from 'src/store';

export const GetTaskByIdRequest = (idTask: number) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    const parameters: GetTaskByIdParametersType = {
      taskId: String(idTask),
    };

    const axiosResponse: AxiosResponse<GetTaskByIdResponseType> = await getTaskByIdAxios(parameters);

    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    dispatch(
      setTaskCurrForForm({
        taskForm: dataTaskData,
      })
    );
  } catch (error) {
    dispatch(
      setIsErrorStatus({
        status: true,
      })
    );
    let errorStr = '';
    if (axios.isAxiosError(error)) {
      errorStr = `Ошибка! ${error.message}!`;
    } else if (error instanceof Error) {
      errorStr = `Ошибка! ${error.name} ${error.message}!`;
    } else {
      errorStr = `Ошибка!`;
    }
    dispatch(
      setErrorContent({
        errorString: errorStr,
      })
    );
  } finally {
    dispatch(setIsLoadingStatus());
  }
};
