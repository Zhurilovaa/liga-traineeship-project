import React from 'react';
import { ErrorMessageProps } from 'src/app/ErrorComponent/ErrorMessage.types';
import { useAppDispatch } from 'src/types/ReduxStore.types';
import { setErrorContent, setIsErrorStatus } from 'src/slices/statusAppSlice';

import 'src/app/ErrorComponent/ErrorMessage.css';

export function ErrorMessage({ message }: ErrorMessageProps) {
  const dispatch = useAppDispatch();

  function handleErrorOk() {
    dispatch(
      setIsErrorStatus({
        status: false,
      })
    );
    dispatch(
      setErrorContent({
        errorString: '',
      })
    );
  }

  return (
    <div className="error-content">
      <div className="error-content__message">
        <div className="error-head">{message}</div>
        <button onClick={handleErrorOk} className="form-task-btn error-btn-ok">
          Ок
        </button>
      </div>
    </div>
  );
}
