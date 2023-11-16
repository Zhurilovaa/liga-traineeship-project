import axios, { AxiosResponse } from 'axios';

import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { addTask } from 'src/slices/tasksSlice';
import { AddTaskParametersType, PostTaskResponseType } from 'src/types/apiTasks';
import { TaskData } from 'src/types/Task.types';
import { postTaskAxios } from 'src/api/postTaskApi';
import { taskResponseToTaskData } from 'src/api/taskResponseMap';
import { AppDispatch } from 'src/store';

export const AddTasksRequest = (taskNew: TaskData) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    const parameters: AddTaskParametersType = {
      name: taskNew.name,
      info: taskNew.info,
      isImportant: taskNew.isImportant,
      isCompleted: taskNew.isCompleted,
    };
    const axiosResponse: AxiosResponse<PostTaskResponseType> = await postTaskAxios(parameters);

    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    dispatch(
      addTask({
        taskNew: {
          ...dataTaskData,
        },
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
