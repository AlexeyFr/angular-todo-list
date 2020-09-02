import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { ITodo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})

export class TodoFormComponent implements OnInit {

  title: string = '';

  constructor( public todosService: TodosService ) {}

  ngOnInit() {}

  addTodo() {

    const todo: ITodo = {
      title: this.title,
      id: Date.now(),
      completed: false,
      date: new Date()
    }

    this.todosService.addTodo(todo)
    this.title = ''

  }

}
