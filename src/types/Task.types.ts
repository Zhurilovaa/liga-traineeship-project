// Интерфейс task
export interface TaskMyProject {
    'id': number; // возможно стоит использовать string
    'name'?: string;
    'info'?: string;
    'isImportant'?: boolean;
    'isCompleted'?: boolean;
}