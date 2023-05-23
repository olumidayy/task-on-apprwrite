export interface NewTaskDTO {
  userId: number;
  title: string;
  description: string;
  categoryId?: number;
  deadline?: Date;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  categoryId?: number;
  deadline?: Date;
}
