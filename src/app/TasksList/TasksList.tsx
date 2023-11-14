import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Task } from 'src/app/TasksList/components/Task/Task';
import { SearchForm } from 'src/app/SearchForm/SearchForm';
import { TaskData } from 'src/types/Task.types';
import { ReduxStoreToolkit } from 'src/types/ReduxStore.types';

import { Loading } from 'src/app/LoadingComponent/Loading';
import { ErrorMessage } from 'src/app/ErrorComponent/ErrorMessage';

import 'src/app/TasksList/TasksList.css';

export function TasksList() {
  const navigateAddTask = useNavigate();

  const isLoading = useSelector((state: ReduxStoreToolkit) => state.statusApp.isLoading);
  const isError = useSelector((state: ReduxStoreToolkit) => state.statusApp.isError);
  const errorMessage = useSelector((state: ReduxStoreToolkit) => state.statusApp.errorContent);

  const taskListCurr = useSelector((state: ReduxStoreToolkit) => state.tasksList.value);

  function handleNavigateAddTask() {
    navigateAddTask(`/task_form`, { replace: false });
  }

  return (
    <div className="main-content">
      <div className="main-content__header main-header">
        <div className="main-header__logo">
          <h1 className="header-logo">TODO APP</h1>
        </div>
        <div className="main-header__btn-add">
          <button className="header-btn-add" onClick={handleNavigateAddTask} title="Нажмите, чтобы добавить задачу!">
            {' '}
          </button>
        </div>
      </div>
      <div className="main-content__search-form">
        <SearchForm />
      </div>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div className="main-content__list main-list">
          {taskListCurr.length === 0 ? (
            <div className="main-list-header error-header">
              <h3>Список задач пуст!</h3>
            </div>
          ) : (
            <div className="main-list-header">
              <h3>Список задач:</h3>
            </div>
          )}
          {taskListCurr.map((task: TaskData, index = 0) => (
            <Task key={index} currTaskProp={task} currIndexProp={index} />
          ))}
        </div>
      )}
    </div>
  );
}
