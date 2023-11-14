import React, { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TaskSubmitForm } from './TaskForm.values';
import { ReduxStoreToolkit, useAppDispatch } from 'types/ReduxStore.types';
import { GetTaskByIdRequest } from 'src/dispatchAxios/getTaskById';

import './TaskForm.css';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';

const validationSchema = Yup.object().shape({
  name_field: Yup.string().required('Это поле обязательно для ввода!'),
  info_field: Yup.string().required('Это поле обязательно для ввода!'),
});

export function TaskForm() {
  const locatPage = useLocation();
  const navigateTaskList = useNavigate();
  const dispatch = useAppDispatch();

  const taskId = useParams().id;
  const taskIdValue = taskId ? +taskId.slice(1) : null;

  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const isError = useSelector((state: ReduxStoreToolkit) => state.statusApp.isError);
  const errorMessage = useSelector((state: ReduxStoreToolkit) => state.statusApp.errorContent);

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
  }, []);

  const taskFormData = useSelector((state: ReduxStoreToolkit) => state.taskForm.taskFormCurr);

  // const defaultTaskSubmitFormValues: TaskSubmitForm = {
  //   name_field: taskFormData.name,
  //   info_field: taskFormData.info,
  //   isImportant_field: taskFormData.isImportant,
  //   isCompleted_field: taskFormData.isCompleted,
  // };

  const { watch, handleSubmit, reset, control, setValue } = useForm<TaskSubmitForm>({
    defaultValues: {
      name_field: taskFormData.name,
      info_field: taskFormData.info,
      isImportant_field: taskFormData.isImportant,
      isCompleted_field: taskFormData.isCompleted,
    },

    resolver: yupResolver(validationSchema),
  });

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

  const onNameFieldChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name_field', evt.target.value);
  const onInfoFieldChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setValue('info_field', evt.target.value);
  const onIsImportantFieldChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setValue('isImportant_field', evt.target.checked);

  const onIsCompletedFieldChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setValue('isCompleted_field', evt.target.checked);

  const onSubmit = (data: TaskSubmitForm) => {
    if (taskIdValue) {
      // dispatch(PatchTasksRequest(taskIdValue, data));
    } else {
      // dispatch(PostTasksRequest(data));
    }
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
      {isLoading ? (
        <div>LOADING...</div>
      ) : isError ? (
        <div> ERROR! {errorMessage} </div>
      ) : (
        <div className="main-content-form__form main-form">
          <form className="main-form__form form-task" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-task-label__input">
              <Controller
                control={control}
                name="name_field"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <input
                      value={field.value}
                      onChange={onNameFieldChange}
                      type="text"
                      placeholder="Введите название задачи..."
                      className={`form-task-label__input label-input ${error?.message ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error?.message}</div>
                  </div>
                )}
              />
            </div>
            <div className="form-task-label__input">
              <Controller
                control={control}
                name="info_field"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <textarea
                      value={field.value}
                      onChange={onInfoFieldChange}
                      placeholder="Введите описание задачи..."
                      className={`label-input label-textarea ${error?.message ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{error?.message}</div>
                  </div>
                )}
              />
            </div>
            <div className="form-task-label__checkbox">
              <label className={watch('isCompleted_field') ? 'disabled-label' : ''}>Important task</label>
              <Controller
                control={control}
                name="isImportant_field"
                render={({ field, fieldState: { error } }) => (
                  <div className="form-checkbox__checkbox">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={onIsImportantFieldChange}
                      className={'label-checkbox ' + (watch('isCompleted_field') ? 'disabled-checkbox' : '')}
                      disabled={watch('isCompleted_field')}
                    />
                    <div className="invalid-feedback">{error?.message}</div>
                  </div>
                )}
              />
            </div>
            <div className="form-task-label__checkbox">
              <label className="form-checkbox__label">Complete task</label>
              <Controller
                control={control}
                name="isCompleted_field"
                render={({ field, fieldState: { error } }) => (
                  <div className="form-checkbox__checkbox">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={onIsCompletedFieldChange}
                      className="label-checkbox"
                    />
                    <div className="invalid-feedback">{error?.message}</div>
                  </div>
                )}
              />
            </div>
            {taskId ? (
              <div className="form-task__btns-edit form-task-btns">
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
      )}
    </div>
  );
}
