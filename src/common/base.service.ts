
export interface BaseService<T> {
	create(data: T): Promise<T>

	getAll(): Promise<T[]>

	getById(id: number): Promise<T>

	update(id: number): Promise<T>

	delete(id: number): Promise<void>
}