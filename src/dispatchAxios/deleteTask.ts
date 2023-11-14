import axios, { AxiosResponse } from 'axios';

import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { deleteTask } from 'src/slices/tasksSlice';
import { DeleteTaskPathType, DeleteTaskResponseType } from 'src/types/apiTasks';
import { deleteTasksAxios } from 'src/api/deleteTaskApi';
import { AppDispatch } from 'src/store';

export const DeleteTaskRequest = (idDelete: number, indexDelete: number) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    const path: DeleteTaskPathType = {
      taskId: String(idDelete),
    };
    const axiosResponse: AxiosResponse<DeleteTaskResponseType> = await deleteTasksAxios(path);
    dispatch(deleteTask({ index: indexDelete }));
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
