import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '../models/todo.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class TodosService {

  public todos: ITodo[] = []

  constructor( public http: HttpClient ) {}

  fetchTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .pipe(tap(
        response => {
          let iteration = 0;
          for (let res of response) {
            res.date = new Date();
            iteration++;
            if (response.length == iteration) { this.todos = response }
          }
        }
      ))
  }

  public onToggle(id: number) {
    const idx = this.todos.findIndex(item => item.id === id)
    this.todos[idx].completed = !this.todos[idx].completed
  }

  public removeTodo(id: number) {
    if (confirm("Are you sure ?")) {
      this.todos = this.todos.filter(item => item.id !== id)
    }
  }

  public addTodo(todo: ITodo) {
    this.todos.push(todo)
  }

}
