import axios, { AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { DeleteTaskPathType, DeleteTaskResponseType } from 'types/apiTasks';
import { deleteTasksAxios } from 'api/deleteTaskApi';
import { AppDispatch } from 'src/store';
import { deleteTask } from 'src/slices/tasksSlice';

export const DeleteTaskRequest = (idDelete: number, indexDelete: number) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    // Формируем запрос параметров
    const path: DeleteTaskPathType = {
      taskId: String(idDelete),
    };
    // Отправить запрос
    const axiosResponse: AxiosResponse<DeleteTaskResponseType> = await deleteTasksAxios(path);
    // Добавить в store даннные
    dispatch(deleteTask({ index: indexDelete }));
  } catch (error) {
    // Установить режим => Произошла ошибка!
    dispatch(setIsErrorStatus());
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
