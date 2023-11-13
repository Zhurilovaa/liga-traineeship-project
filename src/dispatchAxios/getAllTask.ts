import axios, { AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { GetTaskParameters, GetTasksResponse } from 'types/apiTasks';
import { getTasksAxios, mapGetAllTask } from 'api/getTasksApi';
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
      const parameters: GetTaskParameters = {};
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
      const axiosResponse: AxiosResponse<GetTasksResponse> = await getTasksAxios(parameters);

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
      // Установить пояснение ошибки
      dispatch(
        setErrorContent({
          errorString: 'Ошибка! Получение списка задач невозможно!',
        })
      );
    } finally {
      dispatch(setIsLoadingStatus());
    }
  };
