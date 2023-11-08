import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TasksListFormsProps } from './TaskForm.types';
import { TaskMyProject } from 'types/Task.types';
import './TaskForm.css';

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

  function updateTitleTask(titleTask: React.FormEvent<HTMLInputElement>) {
    taskForm.name = titleTask.currentTarget.value;
    console.log(`update title task = ${taskForm.name}`);
  }

  function updateDetailsTask(infoTask: React.FormEvent<HTMLTextAreaElement>) {
    taskForm.info = infoTask.currentTarget.value;
    console.log(`update details task = ${taskForm.info}`);
  }

  function updateIsImportantTask(isImpTask: React.FormEvent<HTMLInputElement>) {
    taskForm.isImportant = isImpTask.currentTarget.checked;
    console.log(`update isImpotant task = ${taskForm.isImportant}`);
  }

  function updateIsCompleteTask(isCompTask: React.FormEvent<HTMLInputElement>) {
    taskForm.isImportant = isCompTask.currentTarget.checked;
    console.log(`update isComplete task = ${taskForm.isImportant}`);
  }
  function updateTask() {
    // Видимо без стейта это слегка бесмысленно)))
    // if (taskId) {
    //   const taskIndex = +taskId.slice(1);
    //   tasksListFormsProp[taskIndex].id = taskForm.id;
    //   tasksListFormsProp[taskIndex].name = taskForm.name;
    //   tasksListFormsProp[taskIndex].info = taskForm.info;
    //   tasksListFormsProp[taskIndex].isImportant = taskForm.isImportant;
    //   tasksListFormsProp[taskIndex].isCompleted = taskForm.isCompleted;
    // }
    console.log('Update task Form done');
  }

  function addTask() {
    // Видимо без стейта это слегка бесмысленно)))
    // if (taskId) {
    //   const taskIndex = +taskId.slice(1);
    //   tasksListFormsProp[taskIndex].id = taskForm.id;
    //   tasksListFormsProp[taskIndex].name = taskForm.name;
    //   tasksListFormsProp[taskIndex].info = taskForm.info;
    //   tasksListFormsProp[taskIndex].isImportant = taskForm.isImportant;
    //   tasksListFormsProp[taskIndex].isCompleted = taskForm.isCompleted;
    // }
    console.log('Add task Form done');
  }

  console.log(`Create TaskForm component id = ${taskId}.`);
  console.log(`Curr location = ${locatPage}`);
  console.log(`Curr TaskFormData = ${taskForm}`);

  return (
    <div className="main-content">
      <div className="main-content-form__header main-form-header">
        <div className="main-header-form__btn-back">
          <button className="header-btn-back" onClick={() => navigateTaskList(`/tasks`, { replace: false })}></button>
        </div>
        <div className="main-form-header__logo">
          <h1 className="header-logo">{taskId ? 'Edit Task' : 'Add Task'}</h1>
        </div>
      </div>
      <div className="main-content-form__form main-form">
        <form className="main-form__form form-task">
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
              <button type="submit" onClick={updateTask} className="form-task-btn">
                Update
              </button>
              <button type="reset" className="form-task-btn">
                Cancel
              </button>
            </div>
          ) : (
            <div className="form-task__btns-add form-task-btns-add">
              <button type="submit" className="form-task-btn btn-add">
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
