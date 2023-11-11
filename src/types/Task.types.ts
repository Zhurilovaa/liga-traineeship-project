// Интерфейс task
export interface TaskData {
    'id': number; // возможно стоит использовать string
    'name'?: string;
    'info'?: string;
    'isImportant'?: boolean;
    'isCompleted'?: boolean;
}