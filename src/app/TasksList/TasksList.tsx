import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Task } from './components/Task/Task';
import { TaskData } from 'types/Task.types';
import { ReduxStoreToolkit } from 'types/ReduxStore.types';

import './TasksList.css';

export function TasksList() {
  const locatPage = useLocation();
  const navigateAddTask = useNavigate();

  const taskListCurr = useSelector((state: ReduxStoreToolkit) => state.tasksList.value);

  console.log(`Create TaskList component.`);
  console.log('Curr location = ', locatPage);

  function handleNavigateAddTask() {
    navigateAddTask(`/task_form`, { replace: false });
  }

  return (
    <div className="main-content">
      <div className="main-content__header main-header">
        <div className="main-header__logo">
          <h1 className="header-logo">TODO APP</h1>
        </div>
        <div className="main-header__btn-add">
          <button className="header-btn-add" onClick={handleNavigateAddTask} title="Нажмите, чтобы добавить задачу!">
            {' '}
          </button>
        </div>
      </div>
      <div className="main-content__list main-list">
        {taskListCurr.map((task: TaskData, index = 0) => (
          <Task key={index} currTaskProp={task} currIndexProp={index} />
        ))}
      </div>
    </div>
  );
}
