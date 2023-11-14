import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { TaskData } from 'types/Task.types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
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
