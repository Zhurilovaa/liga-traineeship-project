import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TasksListFormsProps } from './TaskForm.types';
import { TaskMyProject } from 'app/TasksList/TaskList.types';

export function TaskForm({ tasksListFormsProp = [] }: TasksListFormsProps) {
  const locatPage = useLocation();
  const navigateTaskList = useNavigate();

  const taskId = useParams().id;

  const taskIndexData = taskId
    ? tasksListFormsProp.findIndex((task: TaskMyProject) => task.id === +taskId.slice(1))
    : -1;

  const taskForm: TaskMyProject =
    taskIndexData !== -1
      ? tasksListFormsProp[taskIndexData]
      : {
          id: tasksListFormsProp.length + 1, // возможно стоит использовать string
          name: '',
          info: '',
          isImportant: false,
          isCompleted: false,
        };

  console.log(`Create TaskForm component id = ${taskId}.`);
  console.log('Curr location = ', locatPage);
  console.log('Curr TaskFormData = ', taskForm);
  return (
    <div>
      <div className="list-item__edit">
        <button className="item-btn-edit" onClick={() => navigateTaskList(`/tasks`, { replace: false })}>
          Return to TaskList!
        </button>
      </div>
      <h1>{taskId ? `Форма редактироваяния для taskID = ${taskId.slice(1)}!` : `Форма создания!`}</h1>
    </div>
  );
}
