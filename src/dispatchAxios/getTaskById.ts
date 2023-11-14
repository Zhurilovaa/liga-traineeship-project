import axios, { AxiosResponse, AxiosError } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { GetTaskByIdParametersType, GetTaskByIdResponseType } from 'types/apiTasks';
import { getTaskByIdAxios } from 'api/getTasksApi';
import { taskResponseToTaskData } from 'src/api/taskResponseMap';
import { TaskData } from 'types/Task.types';
import { AppDispatch } from 'src/store';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';

export const GetTaskByIdRequest = (idTask: number) => async (dispatch: AppDispatch) => {
  // изменить isLoading
  dispatch(setIsLoadingStatus());
  try {
    // Формируем запрос параметров
    const parameters: GetTaskByIdParametersType = {
      taskId: String(idTask),
    };

    // Отправить запрос
    const axiosResponse: AxiosResponse<GetTaskByIdResponseType> = await getTaskByIdAxios(parameters);

    // Обработка данных
    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    // Добавить в store даннные
    dispatch(
      setTaskCurrForForm({
        taskForm: dataTaskData,
      })
    );
  } catch (error) {
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
