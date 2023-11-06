import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Task.css';
import { TaskProps } from './Task.types';

export function Task({ currTaskProp }: TaskProps) {
  const navigateFormEdit = useNavigate();
  console.log(`Create Task component id = ${currTaskProp.id}.`);

  return (
    <div className="list-item">
      <div className="list-item__header item-header">{currTaskProp?.name ? currTaskProp.name : 'Task name'}</div>
      <div className="list-item__info item-info">{currTaskProp?.info ? currTaskProp.info : 'Task info'}</div>
      <div className="list-item__edit">
        <button
          className="item-btn-edit"
          onClick={() => navigateFormEdit(`/task_form:${currTaskProp.id}`, { replace: false })}>
          Edit task!
        </button>
      </div>
    </div>
  );
}
