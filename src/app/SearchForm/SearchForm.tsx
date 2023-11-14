import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { SearchSubmitForm } from './SearchForm.values';
import { ReduxStoreToolkit, useAppDispatch } from 'types/ReduxStore.types';

import { GetTasksRequest } from 'src/dispatchAxios/getAllTask';
import { resetFilters, setCompleteFilter, setImportantFilter, setNameSearch } from 'src/slices/searchFormSlice';

import './SearchForm.css';

const validationSchema = Yup.object().shape({
  name_pattern: Yup.string()
    .required('Это поле обязательно для ввода!')
    .min(3, 'Минимальное количество разрешенных символов - 3!')
    .max(20, 'Максимальное количество разрешенных символов - 20!'),
});

export function SearchForm() {
  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const importantFilter = useSelector((state: ReduxStoreToolkit) => state.searchForm.importantFilter);
  const completeFilter = useSelector((state: ReduxStoreToolkit) => state.searchForm.completeFilter);
  const nameSearch = useSelector((state: ReduxStoreToolkit) => state.searchForm.nameSearch);

  const defaultSearchSubmitFormValues: SearchSubmitForm = {
    name_pattern: nameSearch,
  };

  const { handleSubmit, reset, control, setValue } = useForm<SearchSubmitForm>({
    defaultValues: defaultSearchSubmitFormValues,
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: SearchSubmitForm) => {
    dispatch(
      setNameSearch({
        nameSearch: data.name_pattern,
      })
    );

    dispatch(GetTasksRequest(importantFilter, completeFilter, data.name_pattern));
  };

  const handleReset = () => {
    // очистить форму
    reset({ name_pattern: '' });
    // изменить nameSearch
    dispatch(
      setNameSearch({
        nameSearch: '',
      })
    );
    // Данные без nameSearch
    dispatch(GetTasksRequest(importantFilter, completeFilter));
  };

  const handleClickAllFilter = () => {
    // очистить фильтры
    dispatch(resetFilters());
    // Данные без фильтров
    dispatch(GetTasksRequest(false, false, nameSearch));
  };

  const handleClickImportantFilter = () => {
    // изменить importantFilter
    dispatch(setImportantFilter());
    // Данные без фильтров
    dispatch(GetTasksRequest(!importantFilter, completeFilter, nameSearch));
  };

  const handleClickCompleteFilter = () => {
    // изменить completeFilter
    dispatch(setCompleteFilter());
    // Данные без фильтров
    dispatch(GetTasksRequest(importantFilter, !completeFilter, nameSearch));
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
                    placeholder="Введите название задачи..."
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
            <button type="reset" onClick={() => handleReset()} className="form-task-btn btn-search btn-reset">
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="search-block__filters filters">
        <button
          className={'btn-filters ' + (!importantFilter && !completeFilter ? 'active-filter' : '')}
          onClick={() => handleClickAllFilter()}>
          All
        </button>
        <button
          className={'btn-filters ' + (importantFilter ? 'active-filter' : '')}
          onClick={() => handleClickImportantFilter()}>
          Important
        </button>
        <button
          className={'btn-filters ' + (completeFilter ? 'active-filter' : '')}
          onClick={() => handleClickCompleteFilter()}>
          Complete
        </button>
      </div>
    </div>
  );
}
