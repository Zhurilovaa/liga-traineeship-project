import axios, { AxiosResponse } from 'axios';

import { setErrorContent, setIsErrorStatus, setIsLoadingStatus } from 'src/slices/statusAppSlice';
import { setTaskList } from 'src/slices/tasksSlice';
import { GetTaskParametersType, GetTasksResponseType } from 'src/types/apiTasks';
import { TaskData } from 'src/types/Task.types';
import { getTasksAxios } from 'src/api/getTasksApi';
import { mapGetAllTask } from 'src/api/taskResponseMap';
import { AppDispatch } from 'src/store';

export const GetTasksRequest =
  (isImportant = false, isCompleted = false, name_like_search = '') =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsLoadingStatus());
    try {
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
      const axiosResponse: AxiosResponse<GetTasksResponseType> = await getTasksAxios(parameters);

      const dataTaskData: TaskData[] = mapGetAllTask(axiosResponse.data);
      dispatch(
        setTaskList({
          taskList: dataTaskData,
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
