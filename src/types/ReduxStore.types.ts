import { TaskData } from 'types/Task.types';

export interface ReduxStoreToolkit {
    tasksList: { 
        count: number,
        value: TaskData[],
    };
}