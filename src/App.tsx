import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TaskForm } from './app/TaskForm/TaskForm';
import { TaskMyProject } from 'types/Task.types';

import { TasksList } from 'app/TasksList/TasksList';

export function App() {
  const tasksListData: TaskMyProject[] = [
    {
      'id': 1,
      'name': 'Task 1',
      'info': 'task_1',
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
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="tasks" element={<TasksList tasksListProp={tasksListData} />} />
        <Route path="task_form:id" element={<TaskForm tasksListFormsProp={tasksListData} />} />
        <Route path="task_form" element={<TaskForm tasksListFormsProp={tasksListData} />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
