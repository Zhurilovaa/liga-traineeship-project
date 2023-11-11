import React, { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { TaskData } from 'types/Task.types';
import { ReduxStoreToolkit } from 'types/ReduxStore.types';
import { addTask, editTask } from 'src/slices/tasksSlice';

import './TaskForm.css';

export function TaskForm() {
  const locatPage = useLocation();
  const navigateTaskList = useNavigate();
  const dispatch = useDispatch();

  let taskId = useParams().id;
  let taskIdValue = taskId ? +taskId.slice(1) : null;

  const tasksList: TaskData[] = useSelector((state: ReduxStoreToolkit) => state.tasksList.value);

  // Поиск индекса задачи по её id
  const taskFormIndex = tasksList.findIndex((task: TaskData) => task.id === taskIdValue);

  if (taskId && taskFormIndex === -1) {
    alert('Упс! Такой задачи в данный момент не существует! Вы можете добавить новую.');
    taskId = undefined;
    taskIdValue = null;
  }

  const taskForm: TaskData =
    taskFormIndex !== -1
      ? {
          id: tasksList[taskFormIndex].id,
          name: tasksList[taskFormIndex]?.name,
          info: tasksList[taskFormIndex]?.info,
          isImportant: tasksList[taskFormIndex]?.isImportant,
          isCompleted: tasksList[taskFormIndex]?.isCompleted,
        }
      : {
          id: -1,
          name: '',
          info: '',
          isImportant: false,
          isCompleted: false,
        };

  function updateTitleTask(titleTask: React.FormEvent<HTMLInputElement>) {
    taskForm.name = titleTask.currentTarget.value;
  }

  function updateDetailsTask(infoTask: React.FormEvent<HTMLTextAreaElement>) {
    taskForm.info = infoTask.currentTarget.value;
  }

  function updateIsImportantTask(isImpTask: React.FormEvent<HTMLInputElement>) {
    taskForm.isImportant = isImpTask.currentTarget.checked;
  }

  function updateIsCompleteTask(isCompTask: React.FormEvent<HTMLInputElement>) {
    taskForm.isCompleted = isCompTask.currentTarget.checked;
  }

  function handleUpdateTask() {
    dispatch(
      editTask({
        taskUpdate: {
          id: taskForm.id,
          name: taskForm.name,
          info: taskForm.info,
          isImportant: taskForm.isImportant,
          isCompleted: taskForm.isCompleted,
        },
        index: taskFormIndex,
      })
    );
  }

  function handleAddTask() {
    dispatch(
      addTask({
        taskNew: {
          id: taskForm.id,
          name: taskForm.name,
          info: taskForm.info,
          isImportant: taskForm.isImportant,
          isCompleted: taskForm.isCompleted,
        },
      })
    );
  }

  const handleAddOrEditTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskId) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
    navigateTaskList(`/tasks`, { replace: false });
  };

  console.log(`Create TaskForm component id = ${taskId}.`);
  console.log(`Curr location = `, locatPage);

  return (
    <div className="main-content">
      <div className="main-content-form__header main-form-header">
        <div className="main-header-form__btn-back">
          <button
            className="header-btn-back"
            onClick={() => navigateTaskList(`/tasks`, { replace: false })}
            title="Нажмите для возврата к списку задач!"></button>
        </div>
        <div className="main-form-header__logo">
          <h1 className="header-logo">{taskId ? 'Edit Task' : 'Add Task'}</h1>
        </div>
      </div>
      <div className="main-content-form__form main-form">
        <form className="main-form__form form-task" onSubmit={handleAddOrEditTask}>
          <label className="form-task-label__input">
            <input
              name="Title"
              onChange={updateTitleTask}
              defaultValue={taskId && taskForm.name ? taskForm.name : 'Title'}
              className="form-task-label__input label-input"
            />
          </label>
          <label>
            <textarea
              name="Details"
              onChange={updateDetailsTask}
              defaultValue={taskId && taskForm.info ? taskForm.info : 'Details'}
              className="form-task-label__input label-input label-textarea"
            />
          </label>
          <label className="form-task-label__checkbox">
            Important task
            <input
              name="isImportant"
              type="checkbox"
              defaultChecked={taskId && taskForm.isImportant ? taskForm.isImportant : false}
              onChange={updateIsImportantTask}
              className="label-checkbox"
            />
          </label>
          <label className="form-task-label__checkbox">
            Complete
            <input
              name="isComplete"
              type="checkbox"
              defaultChecked={taskId && taskForm.isCompleted ? taskForm.isCompleted : false}
              onChange={updateIsCompleteTask}
              className="label-checkbox"
            />
          </label>
          {taskId ? (
            <div className="form-task__btns-edit form-task-btns-edit">
              <button type="submit" className="form-task-btn" title="Нажмите для сохранения изменений!">
                Update
              </button>
              <button type="reset" className="form-task-btn" title="Нажмите для очистки формы до дефолтных значений!">
                Cancel
              </button>
            </div>
          ) : (
            <div className="form-task__btns-add form-task-btns-add">
              <button type="submit" className="form-task-btn btn-add" title="Нажмите для сохранения задачи в список!">
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
