import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TasksList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Task } from './components/Task/Task';
import { TaskData } from 'types/Task.types';
import { ReduxStoreToolkit } from 'types/ReduxStore.types';

export function TasksList() {
  const locatPage = useLocation();
  const navigateAddTask = useNavigate();

  const taskListCurr = useSelector((state: ReduxStoreToolkit) => state.tasksList.value);
  const dispatch = useDispatch();

  console.log(`Create TaskList component.`);
  console.log('Curr location = ', locatPage);

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
        {taskListCurr.map((task: TaskData) => (
          <Task key={task.id} currTaskProp={task} />
        ))}
      </div>
    </div>
  );
}
