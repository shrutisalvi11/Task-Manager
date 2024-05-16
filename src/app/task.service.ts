import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { task } from './Task.Model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  todo:task[]=[
    new task('Learn C#', 'ajkskjskj')
  ];

  done:task[]=[
    new task('Learn HTML','hgsjs'),
    new task('Learn Css','jssjhjs')
  ];

  taskChanged=new Subject<task[]>();
  constructor() { }

  getTodo(){
    return this.todo.slice();
  }
  
  getDone(){
    return this.done.slice();
  }
  add(taskname:task){
    console.log(taskname)
    this.todo.push(taskname);
    this.taskChanged.next(this.todo.slice())
  }
  delete(index:any){
    this.todo.splice(index,1);
    this.taskChanged.next(this.todo.slice())
  }
  getTask(index:any){
    return this.todo[index];
  }
  update(task:task,index:any){
    this.todo[index]=task;
    this.taskChanged.next(this.todo.slice())
  }
  updateArray(task:task[]){
    this.todo=[];
    this.todo=task;
  }
}
