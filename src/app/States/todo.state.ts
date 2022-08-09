import { ToDo } from '../Models/todo.model';

export interface ToDoState {
    toDos: ToDo[];
    isloading: boolean;
    error: string;
}