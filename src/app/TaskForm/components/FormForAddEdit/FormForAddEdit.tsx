import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { validationSchema } from './FormForAddEdit.validation';
import { EditTasksRequest } from 'src/service/editTask';
import { AddTasksRequest } from 'src/service/addTask';
import { useAppDispatch } from 'src/types/ReduxStore.types';
import { TaskData } from 'src/types/Task.types';
import { setTaskCurrForForm } from 'src/slices/taskFormSlice';
import { TaskFormDataProps, TaskSubmitForm } from 'src/app/TaskForm/components/FormForAddEdit/FormForAddEdit.types';

import 'src/app/TaskForm/components/FormForAddEdit/FormForAddEdit.css';

export function FormForAddEdit({ currTaskFormProp }: TaskFormDataProps) {
  const navigateTaskList = useNavigate();
  const dispatch = useAppDispatch();

  const { watch, handleSubmit, reset, control, setValue } = useForm<TaskSubmitForm>({
    defaultValues: {
      name_field: currTaskFormProp.name,
      info_field: currTaskFormProp.info,
      isImportant_field: currTaskFormProp.isImportant,
      isCompleted_field: currTaskFormProp.isCompleted,
    },

    resolver: yupResolver(validationSchema),
  });

  const onNameFieldChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name_field', evt.target.value);
  const onInfoFieldChange = (evt: ChangeEvent<HTMLTextAreaElement>) => setValue('info_field', evt.target.value);
  const onIsImportantFieldChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setValue('isImportant_field', evt.target.checked);

  const onIsCompletedFieldChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setValue('isCompleted_field', evt.target.checked);

  const onSubmit = (data: TaskSubmitForm) => {
    const newData: TaskData = {
      id: currTaskFormProp.id,
      name: data.name_field,
      info: data.info_field,
      isImportant: data.isImportant_field,
      isCompleted: data.isCompleted_field,
    };
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
    if (currTaskFormProp.id !== -1) {
      dispatch(
        EditTasksRequest({
          ...newData,
        })
      );
    } else {
      dispatch(
        AddTasksRequest({
          ...newData,
        })
      );
    }
    navigateTaskList(`/tasks`, { replace: false });
  };

  return (
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
      {currTaskFormProp.id !== -1 ? (
        <div className="form-task__btns-edit form-task-btns">
          <button type="submit" className="form-task-btn" title="Нажмите для сохранения изменений!">
            Update
          </button>
          <button
            type="reset"
            onClick={() => reset()}
            className="form-task-btn"
            title="Нажмите для очистки формы до дефолтных значений!">
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
  );
}
