import { paths } from "./api";

export type GetTasksResponseType = paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"];
export type GetTaskParametersType = paths["/tasks"]["get"]["parameters"]["query"];

export type GetTaskByIdResponseType = paths["/tasks/{taskId}"]["get"]["responses"]["200"]["content"]["application/json"];
export type GetTaskByIdParametersType = paths["/tasks/{taskId}"]["get"]["parameters"]["path"];

export type DeleteTaskResponseType = paths["/tasks/{taskId}"]["delete"]["responses"]["200"]["content"]["application/json; charset=utf-8"];
export type DeleteTaskParametersType = paths["/tasks/{taskId}"]["delete"]["parameters"]["path"];