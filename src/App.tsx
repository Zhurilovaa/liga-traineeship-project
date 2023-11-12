import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TaskForm } from './app/TaskForm/TaskForm';
import { GetAllTaskRequest } from './dispatchAxios/getAllTask';
import { TasksList } from 'app/TasksList/TasksList';
import { useAppDispatch } from 'types/ReduxStore.types';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetAllTaskRequest());
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
