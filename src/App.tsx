import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TaskForm } from './app/TaskForm/TaskForm';

import { TasksList } from 'app/TasksList/TasksList';

export function App() {
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
