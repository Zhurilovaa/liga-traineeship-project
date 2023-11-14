import axios, { AxiosError, AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { DeleteTaskParametersType, DeleteTaskResponseType } from 'types/apiTasks';
import { deleteTasksAxios } from 'api/deleteTaskApi';
import { AppDispatch } from 'src/store';
import { deleteTask } from 'src/slices/tasksSlice';

export const DeleteTaskRequest = (idDelete: number, indexDelete: number) => async (dispatch: AppDispatch) => {
  dispatch(setIsLoadingStatus());
  try {
    console.log(idDelete);
    console.log(indexDelete);
    // Формируем запрос параметров
    const parameters: DeleteTaskParametersType = {
      taskId: String(idDelete),
    };
    // Отправить запрос
    const axiosResponse: AxiosResponse<DeleteTaskResponseType> = await deleteTasksAxios(parameters);
    console.log(axiosResponse);
    // Добавить в store даннные
    dispatch(deleteTask({ index: indexDelete }));
  } catch (error) {
    // Установить режим => Произошла ошибка!
    dispatch(setIsErrorStatus());
    // Установить пояснение ошибки
    dispatch(
      setErrorContent({
        errorString: 'Ошибка! Удаление задачи неудалось!',
      })
    );
  } finally {
    dispatch(setIsLoadingStatus());
  }
};
