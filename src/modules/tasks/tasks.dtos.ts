export interface NewTaskDTO {
  user: string;
  title: string;
  description: string;
  categoryId?: string;
  deadline?: Date;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  categoryId?: string;
  deadline?: Date;
}
