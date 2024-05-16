import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { task } from '../Task.Model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  Tasks:any;
  TODO:any;
  DONE:any;
  editMode=false
  selectedTask:any;
  TaskIndex:any;
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.initMethod();
    this.taskService.taskChanged.subscribe(resp=>{
      this.TODO=resp;
    })
    this.TODO=this.taskService.getTodo();
    this.DONE=this.taskService.getDone();
  }

  private initMethod(){
    this.Tasks=new FormGroup({
      TaskName:new FormControl(this.selectedTask ? this.selectedTask.TaskName:'',Validators.required),
      TaskDescription:new FormControl(this.selectedTask ? this.selectedTask.TaskDescription:'', Validators.required)
    })
  }

  drop(event:any){
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.taskChanged.subscribe(resp=>{
        this.TODO=resp
      })
    }
    else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    
      console.log(this.TODO);
      this.taskService.updateArray(this.TODO);
    }
  }

  onSubmit(){
    console.log(this.Tasks);
    if(this.editMode){
       this.taskService.update(new task(this.Tasks.value.TaskName,this.Tasks.value.TaskDescription),this.TaskIndex);
       this.editMode=false;
       this.Tasks.reset();
    }
    else{
      this.taskService.add(new task(this.Tasks.value.TaskName,this.Tasks.value.TaskDescription));
      this.Tasks.reset();
    }
  }

  deleteTask(index:any){
     this.taskService.delete(index)
  }
  
  editTask(index:any){
      this.editMode=true;
      this.selectedTask=this.taskService.getTask(index);
      this.TaskIndex=index;
      this.editMode=true;
      this.initMethod();
  }
}
