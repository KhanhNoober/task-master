import { ToDo } from './Models/todo.model';
import { ToDoState } from './States/todo.state';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ToDoActions from './actions/todo.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  updateCard: ToDo = {
    id: '',
    title: '',
    description: '',
    status: false,
    dateCreated: '',
  };
  
  currentCard: ToDo = {
    id: '',
    title: '',
    description: '',
    status: false,
    dateCreated: ''
  };
  toDoState$: Observable<ToDoState> = this.store.select('toDo');
  task$ = this.store.select(state => state.toDo.toDos);
  constructor(private store: Store<{toDo: ToDoState}>) { }
  
  ngOnInit(): void {
    this.toDoState$.subscribe(state => {
      console.log(state);
    });

    this.store.dispatch(ToDoActions.getAll());
  }

  addToDo(): void {
    this.currentCard.id = Date.now().toString();
    this.currentCard.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.addToDo({task: this.currentCard}));
    this.currentCard = {
      id: '',
      title: '',
      description: '',
      status: false,
      dateCreated: ''
    }
  }

  deleteToDo(id: string): void {
    this.store.dispatch(ToDoActions.deleteToDo({id: id}));
  }

  update(task: ToDo) {
    let updateCard = {...task};
    updateCard.status = true;
    this.updateToDo(updateCard);
    this.deleteToDo(task.id);
  }

  addToDoAfterUpdate(task: ToDo) {
    this.updateCard.id = Date.now().toString();
    this.updateCard.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.updateToDo({task: this.updateCard}));
    this.deleteToDo(task.id);
    this.updateCard = {
      id: '',
      title: '',
      description: '',
      status: false,
      dateCreated: ''
    }
  }

  updateToDo(task: ToDo): void {
    task.id = Date.now().toString();
    task.dateCreated = new Date(Date.now()).toUTCString();
    this.store.dispatch(ToDoActions.updateToDo({task: task}));
  }

  title = 'task-master';
}
