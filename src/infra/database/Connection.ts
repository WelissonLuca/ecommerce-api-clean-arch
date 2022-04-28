export interface Connection {
  query(statment: string, params: any[]) : Promise<any>;
}