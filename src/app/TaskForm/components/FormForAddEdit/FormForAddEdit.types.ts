import { TaskData } from "src/types/Task.types";

export interface TaskFormDataProps {
  currTaskFormProp: TaskData,
}

export type TaskSubmitForm = {
  name_field: string;
  info_field: string;
  isImportant_field: boolean;
  isCompleted_field: boolean;
};
