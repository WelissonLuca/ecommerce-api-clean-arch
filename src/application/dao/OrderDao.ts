export interface OrderDao {
  get(code: string): Promise<{ code: string; total: number }>;
  findAll(): Promise<{ code: string; total: number }[]>;
}
