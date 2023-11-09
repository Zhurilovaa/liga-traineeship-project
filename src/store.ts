import { createStore, Action } from 'redux';
import { ReduxStore } from 'types/ReduxStore.types';
import { reducerStore } from './reducer';

// Хранилище (store)—это объект, 
// который содержит состояние приложения
// Состояние {
// taskList: Task[]    
//}
// отображает состояние через getState()
// может обновлять состояние через dispatch()
// позволяет регистрироваться (или удаляться) в качестве
// слушателя изменения состояния через subscribe()
export const store = createStore<ReduxStore, Action, unknown, unknown>(
    reducerStore,
    {
      tasksListStore: [
        {
          id: 1,
          name: 'Task 1',
          info: 'task_1',
        },
        {
          'id': 2,
          'name': 'Task 2',
          'info': 'task_2',
        },
        {
          'id': 3,
          'name': 'Task 3',
        },
        {
          'id': 4,
          'info': 'task_4',
        },
        {
          'id': 5,
          'name': 'оооооооооченьььь сильно длинннннннннннннное названиеееееееее 111111111111122222222222333333333',
          'info': 'task_5',
        },
        {
          'id': 6,
          'name': 'Task 6',
          'info':
            'task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 task_6 ',
        },
      ]
    },
);

console.log(store.getState());

export const reduxUnsubscribe = store.subscribe(() =>
  console.log(store.getState())
);
