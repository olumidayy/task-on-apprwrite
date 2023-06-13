export interface NewCategoryDTO {
  userId: string;
  name: string;
  description?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
}
