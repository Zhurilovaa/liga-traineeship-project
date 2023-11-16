import React, { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { validationSchema } from '../SearchForm/SearchForm.validation';
import { SearchSubmitForm } from 'app/SearchForm/SearchForm.types';
import { ReduxStoreToolkit, useAppDispatch } from 'types/ReduxStore.types';

import { GetTasksRequest } from 'src/service/getAllTask';
import { resetFilters, setCompleteFilter, setImportantFilter, setNameSearch } from 'src/slices/searchFormSlice';

import 'src/app/SearchForm/SearchForm.css';

export function SearchForm() {
  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const importantFilter = useSelector((state: ReduxStoreToolkit) => state.searchForm.importantFilter);
  const completeFilter = useSelector((state: ReduxStoreToolkit) => state.searchForm.completeFilter);
  const nameSearch = useSelector((state: ReduxStoreToolkit) => state.searchForm.nameSearch);
  const dispatch = useAppDispatch();

  const defaultSearchSubmitFormValues: SearchSubmitForm = {
    name_pattern: nameSearch,
  };

  const { handleSubmit, reset, control, setValue } = useForm<SearchSubmitForm>({
    defaultValues: defaultSearchSubmitFormValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: SearchSubmitForm) => {
    dispatch(
      setNameSearch({
        nameSearch: data.name_pattern,
      })
    );

    dispatch(GetTasksRequest(importantFilter, completeFilter, data.name_pattern));
  };

  const handleReset = () => {
    reset({ name_pattern: '' });
    dispatch(
      setNameSearch({
        nameSearch: '',
      })
    );
    dispatch(GetTasksRequest(importantFilter, completeFilter));
  };

  const handleClickAllFilter = () => {
    dispatch(resetFilters());
    dispatch(GetTasksRequest(false, false, nameSearch));
  };

  const handleClickImportantFilter = () => {
    dispatch(setImportantFilter());
    dispatch(GetTasksRequest(!importantFilter, completeFilter, nameSearch));
  };

  const handleClickCompleteFilter = () => {
    dispatch(setCompleteFilter());
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
          onClick={() => handleClickAllFilter()}
          disabled={!importantFilter && !completeFilter}>
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
          Completed
        </button>
      </div>
    </div>
  );
}
