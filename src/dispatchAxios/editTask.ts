import axios, { AxiosResponse } from 'axios';

import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { editTask } from 'src/slices/tasksSlice';
import { PatchTaskParametersType, PatchTaskPathType, PatchTaskResponseType } from 'src/types/apiTasks';
import { TaskData } from 'src/types/Task.types';
import { patchTaskAxios } from 'src/api/patchTaskApi';
import { taskResponseToTaskData } from 'src/api/taskResponseMap';
import { AppDispatch } from 'src/store';

export const EditTasksRequest = (taskUpdate: TaskData) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    const path: PatchTaskPathType = {
      taskId: String(taskUpdate.id),
    };
    const parameters: PatchTaskParametersType = {
      name: taskUpdate.name,
      info: taskUpdate.info,
      isImportant: taskUpdate.isImportant,
      isCompleted: taskUpdate.isCompleted,
    };
    const axiosResponse: AxiosResponse<PatchTaskResponseType> = await patchTaskAxios(path, parameters);

    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    dispatch(
      editTask({
        taskUpdate: dataTaskData,
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
