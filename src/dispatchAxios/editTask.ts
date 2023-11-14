import axios, { AxiosResponse } from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { PatchTaskParametersType, PatchTaskPathType, PatchTaskResponseType } from 'src/types/apiTasks';
import { patchTaskAxios } from 'src/api/patchTaskApi';

import { TaskData } from 'src/types/Task.types';
import { editTask } from 'src/slices/tasksSlice';
import { AppDispatch } from 'src/store';

import { taskResponseToTaskData } from 'src/api/taskResponseMap';

export const EditTasksRequest = (taskUpdate: TaskData) => async (dispatch: AppDispatch) => {
  // изменить isLoading
  dispatch(setIsLoadingStatus());
  try {
    // Формируем запрос параметров
    const path: PatchTaskPathType = {
      taskId: String(taskUpdate.id),
    };
    // Формируем запрос параметров
    const parameters: PatchTaskParametersType = {
      name: taskUpdate.name,
      info: taskUpdate.info,
      isImportant: taskUpdate.isImportant,
      isCompleted: taskUpdate.isCompleted,
    };
    // Отправить запрос
    const axiosResponse: AxiosResponse<PatchTaskResponseType> = await patchTaskAxios(path, parameters);

    // Обработка данных
    const dataTaskData: TaskData = taskResponseToTaskData(axiosResponse.data);
    // Добавить в store даннные
    dispatch(
      editTask({
        taskUpdate: dataTaskData,
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
