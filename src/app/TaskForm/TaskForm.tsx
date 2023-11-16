import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { FormForAddEdit } from 'src/app/TaskForm/components/FormForAddEdit/FormForAddEdit';
import { ReduxStoreToolkit, useAppDispatch } from 'src/types/ReduxStore.types';
import { GetTaskByIdRequest } from 'src/service/getTaskById';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';

import { Loading } from 'src/app/LoadingComponent/Loading';
import { ErrorMessage } from 'app/ErrorComponent/ErrorMessage';

import 'src/app/TaskForm/TaskForm.css';

export function TaskForm() {
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

  function handleClickClearForm() {
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
    navigateTaskList(`/tasks`, { replace: false });
  }

  return (
    <div className="main-content">
      <div className="main-content-form__header main-form-header">
        <div className="main-header-form__btn-back">
          <button
            className="header-btn-back"
            onClick={handleClickClearForm}
            title="Нажмите для возврата к списку задач!"></button>
        </div>
        <div className="main-form-header__logo">
          <h1 className="header-logo">{taskFormData.id !== -1 ? 'Edit Task' : 'Add Task'}</h1>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="main-content-form__form main-form">
          <FormForAddEdit currTaskFormProp={taskFormData} />
        </div>
      )}
    </div>
  );
}
