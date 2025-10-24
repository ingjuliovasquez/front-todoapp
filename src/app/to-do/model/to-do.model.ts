export interface Todo {
  id: string;
  name: string;
  finished: boolean;
  priority: ETodoPriority;

  audCreatedAt?: Date | null;
  audDeletedAt?: Date | null;
  audIsActive?: boolean;
  audUpdatedAt?: Date;
}

export enum ETodoPriority {
   LOW = 'LOW',
   MED = 'MED',
   HI = 'HI',
}

export type Filters = 'all' | 'active' | 'finished';

export interface Stats {
  total: number;
  active: number;
  finished: number;
}

export interface TodoResponse {
    message: string;
    data: Todo[];
    total?: number;
    page?: number;
    limit?: number;
}

export interface TodoResponseById {
    message: string;
    data: Todo;
}
