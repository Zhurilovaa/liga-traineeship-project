import axios, { AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { AddTaskParametersType, PostTaskResponseType } from 'src/types/apiTasks';
import { postTaskAxios } from 'src/api/postTaskApi';

import { TaskData } from 'src/types/Task.types';
import { addTask } from 'src/slices/tasksSlice';
import { AppDispatch } from 'src/store';

import { taskResponseToTaskData } from 'src/api/taskResponseMap';

export const AddTasksRequest = (taskNew: TaskData) => async (dispatch: AppDispatch) => {
  // изменить isLoading
  dispatch(setIsLoadingStatus());
  try {
    // Формируем запрос параметров
    const parameters: AddTaskParametersType = {
      name: taskNew.name,
      info: taskNew.info,
      isImportant: taskNew.isImportant,
      isCompleted: taskNew.isCompleted,
    };
    // Отправить запрос
    const axiosResponse: AxiosResponse<PostTaskResponseType> = await postTaskAxios(parameters);

    // Обработка данных
    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    // Добавить в store даннные
    dispatch(
      addTask({
        taskNew: dataTaskData,
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
