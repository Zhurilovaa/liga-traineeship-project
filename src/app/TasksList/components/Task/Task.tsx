import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Task.css';
import { TaskProps } from './Task.types';
import { TaskButton } from './components/TaskButton/TaskButton';
import { setIsImportantTask, setIsCompleteTask } from 'src/slices/tasksSlice';
import { useAppDispatch } from 'types/ReduxStore.types';
import { DeleteTaskRequest } from 'src/dispatchAxios/deleteTask';

export function Task({ currTaskProp, currIndexProp }: TaskProps) {
  const navigateFormEdit = useNavigate();
  const dispatch = useAppDispatch();

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
    const deleteAnsw = confirm('Вы действительно уверены, что хотите стереть эту задачу?');
    if (deleteAnsw) {
      dispatch(DeleteTaskRequest(currTaskProp.id, currIndexProp));
    }
  }

  function handleNavigateEditTaskForm() {
    navigateFormEdit(`/task_form:${currTaskProp.id}`, { replace: false });
  }

  return (
    <div className="list-item">
      <div
        className={
          ' list-item__header item-header ' +
          (currTaskProp.isCompleted ? 'complete' : currTaskProp.isImportant ? 'important' : '')
        }>
        #{currTaskProp.id} {currTaskProp?.name ? currTaskProp.name : 'Task name'}
      </div>
      <div className="list-item__info item-info">{currTaskProp?.info ? currTaskProp.info : 'Task info'}</div>
      <div className="list-item__btns-for-task">
        <button
          className="item-btn-for-task"
          onClick={handleNavigateEditTaskForm}
          title="Нажмите для внесения изменений в задачу!">
          <TaskButton typeOfButtonProp={'edit'} />
        </button>
        <button
          className={'item-btn-for-task'}
          onClick={handleSetImportantTask}
          title="Нажмите, чтобы указать важность задачи!"
          disabled={currTaskProp.isCompleted}>
          <TaskButton
            typeOfButtonProp={currTaskProp.isImportant ? 'important' : 'not important'}
            disabled={currTaskProp.isCompleted}
          />
        </button>
        <button
          className="item-btn-for-task"
          onClick={handleSetCompleteTask}
          title="Нажмите, чтобы указать завершение задачи!">
          <TaskButton typeOfButtonProp={currTaskProp.isCompleted ? 'complete' : 'not complete'} />
        </button>
        <button className="item-btn-for-task" onClick={handleDeleteTask} title="Нажмите, чтобы удалить задачу!">
          <TaskButton typeOfButtonProp={'delete'} />
        </button>
      </div>
    </div>
  );
}
