import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://task-management-c1e20-default-rtdb.firebaseio.com/tasks'

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}.json`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<{ [key: string]: Task }>(`${this.apiUrl}.json`).pipe(
      map(responseData => {
        const tasksArray: Task[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) { //Checks if the key is a direct property of responseData
            tasksArray.push({ ...responseData[key], id: key });
          }
        }
        return tasksArray;
      })
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}.json`);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}.json`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}.json`);
  }
}