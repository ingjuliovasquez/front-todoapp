import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ETodoPriority, Todo, TodoResponse, TodoResponseById } from '../model/to-do.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl= '/v1/todo'

  create(name: string, priority: ETodoPriority) {
    const url = `${environment.apiUrl}${this.baseUrl}/create`;
    return this.http.post<Todo>(url, {name, priority, finished: false})
  }

  update(id: string, payload: Partial<Pick<Todo, 'name' | 'finished' | 'priority'>>): Observable<Todo> {
    const url = `${environment.apiUrl}${this.baseUrl}/update/${id}`;
    return this.http.patch<Todo>(url, payload)
  }

  getTaskById(id: string) {
    const url = `${environment.apiUrl}${this.baseUrl}/list/${id}`;
    return this.http.get<TodoResponseById>(url);
  }

  list(limit: number = 50, page: number = 1) {
    const url = `${environment.apiUrl}/v1/todo/list`;
    return this.http.get<TodoResponse>(url, {
      params: {
        limit: String(limit),
        page: String(page),
      },
    });
  }

  delete(id: string): Observable<void> {
    const url = `${environment.apiUrl}${this.baseUrl}/list/${id}`;
    return this.http.delete<void>(url);
  }

}
