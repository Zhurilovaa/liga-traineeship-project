import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TasksList.css';
import { TasksListProps } from './TaskList.types';
import { Task } from './components/Task/Task';
import { TaskMyProject } from 'types/Task.types';

export function TasksList({ tasksListProp = [] }: TasksListProps) {
  const locatPage = useLocation();
  const navigateAddTask = useNavigate();

  console.log(`Create TaskList component.`);
  console.log('Curr location = ', locatPage);
  console.log('Curr tasks = ', tasksListProp);

  return (
    <div className="main-content">
      <div className="main-content__header main-header">
        <div className="main-header__logo">
          <h1 className="header-logo">TODO APP</h1>
        </div>
        <div className="main-header__btn-add">
          <button className="header-btn-add" onClick={() => navigateAddTask(`/task_form`, { replace: false })}>
            {' '}
          </button>
        </div>
      </div>
      <div className="main-content__list main-list">
        {tasksListProp.map((task: TaskMyProject) => (
          <Task key={task.id} currTaskProp={task} />
        ))}
      </div>
    </div>
  );
}
