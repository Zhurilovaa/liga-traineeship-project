import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SearchSubmitForm, defaultSearchSubmitFormValues } from './SearchForm.values';
import { ReduxStoreToolkit } from 'types/ReduxStore.types';

import './SearchForm.css';

const validationSchema = Yup.object().shape({
  name_pattern: Yup.string()
    .required('Это поле обязательно для ввода!')
    .min(3, 'Минимальное количество разрешенных символов - 3!')
    .max(20, 'Максимальное количество разрешенных символов - 20!'),
});

export function SearchForm() {
  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const { handleSubmit, reset, control, setValue } = useForm<SearchSubmitForm>({
    defaultValues: defaultSearchSubmitFormValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: SearchSubmitForm) => {
    //dispatch тут
  };

  const onNamePatternChange = (evt: ChangeEvent<HTMLInputElement>) => setValue('name_pattern', evt.target.value);

  return (
    <div className="search-block" aria-disabled={isLoading}>
      <div className="search-block__search-form">
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
          <div className="search-form__input">
            <Controller
              control={control}
              name="name_pattern"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <input
                    value={field.value}
                    onChange={onNamePatternChange}
                    type="text"
                    placeholder="Введите название..."
                    className={`label-input input-search ${error?.message ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{error?.message}</div>
                </div>
              )}
            />
          </div>
          <div className="search-form__buttons-block form-task-btns">
            <button type="submit" className="form-task-btn btn-search">
              Search
            </button>
            <button type="reset" onClick={() => reset()} className="form-task-btn btn-search btn-reset">
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="search-block__filters filters">Фильтры</div>
    </div>
  );
}
