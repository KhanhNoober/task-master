import { ToDo } from './../Models/todo.model';
import { createAction, props } from "@ngrx/store";


export const addToDo = createAction(
    '[Todo] Add',
    props<{ task: ToDo }>()
);

export const addToDoSuceeded = createAction(
    '[Todo] Add Succeeded',
);

export const addToDoFailed = createAction(
    '[Todo] Add Failed',
    props<{ error: string }>()
);

export const getAll = createAction(
    '[Todo] Get All'
);

export const getAllSucceeded = createAction(
    '[Todo] Get All Succeeded',
    props<{ todos: ToDo[] }>()
);

export const getAllFailed = createAction(
    '[Todo] Get All Failed',
    props<{ error: string }>()
);

export const deleteToDo = createAction(
    '[Todo] Delete',
    props<{ id: string }>()
);

export const deleteToDoSucceeded = createAction(
    '[Todo] Delete Succeeded'
);

export const deleteToDoFailed = createAction(
    '[Todo] Delete Failed',
    props<{ error: string }>()
);

export const updateToDo = createAction(
    '[Todo] Update',
    props<{ task: ToDo }>()
);

export const updateToDoSucceeded = createAction(
    '[Todo] Update Succeeded'
);

export const updateToDoFailed = createAction(
    '[Todo] Update Failed',
    props<{ error: string }>()
);