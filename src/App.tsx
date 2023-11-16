import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { TaskForm } from 'src/app/TaskForm/TaskForm';
import { GetTasksRequest } from 'src/service/getAllTask';
import { TasksList } from 'src/app/TasksList/TasksList';
import { useAppDispatch } from 'src/types/ReduxStore.types';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetTasksRequest());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="tasks" element={<TasksList />} />
        <Route path="task_form:id" element={<TaskForm />} />
        <Route path="task_form" element={<TaskForm />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
