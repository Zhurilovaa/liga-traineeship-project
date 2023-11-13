import { paths } from "./api";

export type GetTasksResponse = paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"];
export type GetTaskParameters = paths["/tasks"]["get"]["parameters"]["query"];

export type DeleteTaskResponse = paths["/tasks/{taskId}"]["delete"]["responses"]["200"]["content"]["application/json; charset=utf-8"];
export type DeleteTaskParameters = paths["/tasks/{taskId}"]["delete"]["parameters"]["path"];