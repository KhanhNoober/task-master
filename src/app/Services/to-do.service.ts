import { Injectable } from '@angular/core';
import { collection, collectionSnapshots, deleteDoc, doc, Firestore, getDocs, setDoc } from "@angular/fire/firestore";
import { ToDo } from './../Models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private db: Firestore) { }

  addNew(toDo: ToDo) {
    if (!toDo.id) {
      throw new Error('ToDo must have an id');
    }
    return setDoc(doc(this.db, 'todos/' + toDo.id), toDo);
  }

  getAll() {
    return collectionSnapshots(collection(this.db, 'todos'));
  }

  deleteTask(id: string) {
    return deleteDoc(doc(this.db, 'todos/' + id));
  }

  updateTask(toDo: ToDo) {
    return setDoc(doc(this.db, 'todos/' + toDo.id), toDo);
  }
  
}
