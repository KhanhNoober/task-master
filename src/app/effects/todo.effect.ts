import { ToDo } from './../Models/todo.model';
import { ToDoService } from './../Services/to-do.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ToDoActions from '../actions/todo.action';
import { catchError, from, map, of, switchMap } from 'rxjs';


@Injectable()
export class ToDoEffect {
    constructor(private action$: Actions, private toDoService: ToDoService) {}

    getToDo$ = createEffect(
        () => this.action$.pipe(
            ofType(ToDoActions.addToDo),
            switchMap(action => from(this.toDoService.addNew(action.task)).pipe(
                map(() => ToDoActions.addToDoSuceeded()),
                catchError((error) => of(ToDoActions.addToDoFailed(error.message)))
            )))
    )

    getAll$ = createEffect(
        () => this.action$.pipe(
            ofType(ToDoActions.getAll),
            switchMap(() => from(this.toDoService.getAll()).pipe(
                map(snapshot => {
                    let toDo = snapshot.map(doc => <ToDo>doc.data());
                    return ToDoActions.getAllSucceeded({ todos: toDo });
                }),
                catchError((error) => of(ToDoActions.getAllFailed(error.message)))
            )))
    )

    deleteToDo$ = createEffect(
        () => this.action$.pipe(
            ofType(ToDoActions.deleteToDo),
            switchMap(action => from(this.toDoService.deleteTask(action.id)).pipe(
                map(() => ToDoActions.deleteToDoSucceeded()),
                catchError((error) => of(ToDoActions.deleteToDoFailed(error.message)))
            )))
    )

    updateToDo$ = createEffect(
        () => this.action$.pipe(
            ofType(ToDoActions.updateToDo),
            switchMap(action => from(this.toDoService.updateTask(action.task)).pipe(
                map(() => ToDoActions.updateToDoSucceeded()),
                catchError((error) => of(ToDoActions.updateToDoFailed(error.message)))
            )))
    )

}