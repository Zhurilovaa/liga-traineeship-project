import { paths } from './api';

export type GetTasksResponseType = paths['/tasks']['get']['responses']['200']['content']['application/json'];
export type GetTaskParametersType = paths['/tasks']['get']['parameters']['query'];

export type GetTaskByIdResponseType =
  paths['/tasks/{taskId}']['get']['responses']['200']['content']['application/json'];
export type GetTaskByIdParametersType = paths['/tasks/{taskId}']['get']['parameters']['path'];

export type DeleteTaskResponseType =
  paths['/tasks/{taskId}']['delete']['responses']['200']['content']['application/json; charset=utf-8'];
export type DeleteTaskPathType = paths['/tasks/{taskId}']['delete']['parameters']['path'];

export type PostTaskResponseType = paths['/tasks']['post']['responses']['200']['content']['application/json'];
export type PostTaskParametersType = Required<paths['/tasks']['post']>['requestBody']['content']['application/json'];
export type AddTaskParametersType = PostTaskParametersType & { isCompleted?: boolean };

export type PatchTaskResponseType =
  paths['/tasks/{taskId}']['patch']['responses']['200']['content']['application/json'];
export type PatchTaskParametersType = Required<
  paths['/tasks/{taskId}']['patch']
>['requestBody']['content']['application/json'];
export type PatchTaskPathType = paths['/tasks/{taskId}']['patch']['parameters']['path'];

export const OptionsRequest = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
