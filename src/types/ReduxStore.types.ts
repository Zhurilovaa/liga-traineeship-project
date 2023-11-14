import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { TaskData } from 'src/types/Task.types';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

export interface ReduxStoreToolkit {
  tasksList: {
    count: number;
    value: TaskData[];
  };
  taskForm: {
    taskFormCurr: TaskData;
  };
  searchForm: {
    importantFilter: boolean;
    completeFilter: boolean;
    nameSearch: string;
  };
  statusApp: {
    isLoading: boolean;
    isError: boolean;
    errorContent: string;
  };
}
