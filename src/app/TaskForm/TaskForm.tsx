import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FormForAddEdit } from './components/FormForAddEdit/FormForAddEdit';
import { ReduxStoreToolkit, useAppDispatch } from 'types/ReduxStore.types';
import { GetTaskByIdRequest } from 'src/dispatchAxios/getTaskById';

import './TaskForm.css';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';

export function TaskForm() {
  const locatPage = useLocation();
  const navigateTaskList = useNavigate();
  const dispatch = useAppDispatch();

  const taskId = useParams().id;
  const taskIdValue = taskId ? +taskId.slice(1) : null;

  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const isError = useSelector((state: ReduxStoreToolkit) => state.statusApp.isError);
  const errorMessage = useSelector((state: ReduxStoreToolkit) => state.statusApp.errorContent);
  const taskFormData = useSelector((state: ReduxStoreToolkit) => state.taskForm.taskFormCurr);

  useEffect(() => {
    if (taskIdValue) {
      dispatch(GetTaskByIdRequest(taskIdValue));
    } else {
      dispatch(
        setTaskCurrForForm({
          taskForm: {
            id: -1,
            name: '',
            info: '',
            isImportant: false,
            isCompleted: false,
          },
        })
      );
    }
  }, [dispatch]);

  // const tasksList: TaskData[] = useSelector((state: ReduxStoreToolkit) => state.tasksList.value);

  // // Поиск индекса задачи по её id
  // const taskFormIndex = tasksList.findIndex((task: TaskData) => task.id === taskIdValue);

  // if (taskId && taskFormIndex === -1) {
  //   alert('Упс! Такой задачи в данный момент не существует! Вы можете добавить новую.');
  //   taskId = undefined;
  //   taskIdValue = null;
  // }

  // const taskForm: TaskData =
  //   taskFormIndex !== -1
  //     ? {
  //         id: tasksList[taskFormIndex].id,
  //         name: tasksList[taskFormIndex]?.name,
  //         info: tasksList[taskFormIndex]?.info,
  //         isImportant: tasksList[taskFormIndex]?.isImportant,
  //         isCompleted: tasksList[taskFormIndex]?.isCompleted,
  //       }
  //     : {
  //         id: -1,
  //         name: '',
  //         info: '',
  //         isImportant: false,
  //         isCompleted: false,
  //       };

  // function updateTitleTask(titleTask: React.FormEvent<HTMLInputElement>) {
  //   taskForm.name = titleTask.currentTarget.value;
  // }

  // function updateDetailsTask(infoTask: React.FormEvent<HTMLTextAreaElement>) {
  //   taskForm.info = infoTask.currentTarget.value;
  // }

  // function updateIsImportantTask(isImpTask: React.FormEvent<HTMLInputElement>) {
  //   taskForm.isImportant = isImpTask.currentTarget.checked;
  // }

  // function updateIsCompleteTask(isCompTask: React.FormEvent<HTMLInputElement>) {
  //   taskForm.isCompleted = isCompTask.currentTarget.checked;
  // }

  // function handleUpdateTask() {
  //   dispatch(
  //     editTask({
  //       taskUpdate: {
  //         id: taskForm.id,
  //         name: taskForm.name,
  //         info: taskForm.info,
  //         isImportant: taskForm.isImportant,
  //         isCompleted: taskForm.isCompleted,
  //       },
  //       index: taskFormIndex,
  //     })
  //   );
  // }

  // function handleAddTask() {
  //   dispatch(
  //     addTask({
  //       taskNew: {
  //         id: taskForm.id,
  //         name: taskForm.name,
  //         info: taskForm.info,
  //         isImportant: taskForm.isImportant,
  //         isCompleted: taskForm.isCompleted,
  //       },
  //     })
  //   );
  // }

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
      {isLoading ? (
        <div>LOADING...</div>
      ) : isError ? (
        <div> ERROR! {errorMessage} </div>
      ) : (
        <div className="main-content-form__form main-form">
          <FormForAddEdit currTaskFormProp={taskFormData} />
        </div>
      )}
    </div>
  );
}
