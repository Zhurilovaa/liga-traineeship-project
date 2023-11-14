import axios, { AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { GetTaskParametersType, GetTasksResponseType } from 'types/apiTasks';
import { getTasksAxios } from 'api/getTasksApi';
import { mapGetAllTask } from 'api/taskResponseMap';
import { TaskData } from 'types/Task.types';
import { setTaskList } from 'src/slices/tasksSlice';
import { AppDispatch } from 'src/store';

export const GetTasksRequest =
  (isImportant = false, isCompleted = false, name_like_search = '') =>
  async (dispatch: AppDispatch) => {
    // изменить isLoading
    dispatch(setIsLoadingStatus());
    try {
      // Формируем запрос параметров
      const parameters: GetTaskParametersType = {};
      if (isImportant) {
        parameters['isImportant'] = true;
      }
      if (isCompleted) {
        parameters['isCompleted'] = true;
      }
      if (name_like_search) {
        parameters['name_like'] = name_like_search;
      }
      // Отправить запрос
      const axiosResponse: AxiosResponse<GetTasksResponseType> = await getTasksAxios(parameters);

      // Обработка данных
      const dataTaskData: TaskData[] = mapGetAllTask(axiosResponse.data);
      // Добавить в store даннные
      dispatch(
        setTaskList({
          taskList: dataTaskData,
        })
      );
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
