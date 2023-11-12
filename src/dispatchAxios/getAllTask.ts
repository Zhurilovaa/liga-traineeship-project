import axios from 'axios';
import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { GetTaskResponse } from 'types/apiTasks';
import { getAllTasks, mapGetAllTask } from 'api/getTasksAllVariants';
import { TaskData } from 'types/Task.types';
import { setTaskList } from 'src/slices/tasksSlice';
import { AppDispatch } from 'src/store';
import { urlServer } from 'constants/url';

export const GetAllTaskRequest = () => async (dispatch: AppDispatch) => {
  // изменить isLoading
  dispatch(setIsLoadingStatus());
  try {
    console.log('здесь!');
    // Отправить запрос
    const data: GetTaskResponse = (await axios.get(urlServer)).data;
    console.log(typeof data);
    // Обработка данных
    const dataTaskData: TaskData[] = mapGetAllTask(data);
    // Добавить в store даннные
    dispatch(
      setTaskList({
        taskList: dataTaskData,
      })
    );
  } catch (error) {
    console.log(error);
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
