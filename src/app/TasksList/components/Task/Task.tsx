import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Task.css';
import { useDispatch } from 'react-redux';
import { TaskProps } from './Task.types';
import { TaskButton } from './components/TaskButton/TaskButton';
import { setIsImportantTask, setIsCompleteTask, deleteTask, changeIndexTaskForForm } from 'src/slices/tasksSlice';

export function Task({ currTaskProp, currIndexProp }: TaskProps) {
  const navigateFormEdit = useNavigate();
  const dispatch = useDispatch();
  // console.log(`currIndex = ${currIndexProp} for curr Task = `, currTaskProp);

  function handleSetImportantTask() {
    dispatch(
      setIsImportantTask({
        index: currIndexProp,
      })
    );
  }

  function handleSetCompleteTask() {
    dispatch(
      setIsCompleteTask({
        index: currIndexProp,
      })
    );
  }

  function handleDeleteTask() {
    dispatch(
      deleteTask({
        index: currIndexProp,
      })
    );
  }

  function handleUpdateIndexTaskForm() {
    dispatch(
      changeIndexTaskForForm({
        index: currIndexProp,
      })
    );
    navigateFormEdit(`/task_form:${currTaskProp.id}`, { replace: false });
  }

  return (
    <div className="list-item">
      <div
        className={
          ' list-item__header item-header ' +
          (currTaskProp.isImportant ? 'important ' : '') +
          (currTaskProp.isCompleted ? 'complete ' : '')
        }>
        {currTaskProp?.name ? currTaskProp.name : 'Task name'}
      </div>
      <div className="list-item__info item-info">{currTaskProp?.info ? currTaskProp.info : 'Task info'}</div>
      <div className="list-item__btns-for-task">
        <button className="item-btn-for-task" onClick={handleUpdateIndexTaskForm}>
          <TaskButton typeOfButtonProp={'edit'} />
        </button>
        <button className="item-btn-for-task" onClick={handleSetImportantTask}>
          <TaskButton typeOfButtonProp={currTaskProp.isImportant ? 'important' : 'not important'} />
        </button>
        <button className="item-btn-for-task" onClick={handleSetCompleteTask}>
          <TaskButton typeOfButtonProp={currTaskProp.isCompleted ? 'complete' : 'not complete'} />
        </button>
        <button className="item-btn-for-task" onClick={handleDeleteTask}>
          <TaskButton typeOfButtonProp={'delete'} />
        </button>
      </div>
    </div>
  );
}
