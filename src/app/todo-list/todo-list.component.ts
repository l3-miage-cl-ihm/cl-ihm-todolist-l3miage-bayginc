import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';


@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() inputText: string | undefined;

  constructor(public tdlService : TodolistService) { }

  ngOnInit(): void {
  }

  
  onSumbit(donne: NgForm) {
    this. tdlService.create(donne.value['newTodoInput']);
  }

  trackById(i: number, e:TodoItem):number{
    return e.id;
  }

  removeItem(t: TodoItem){
    console.log("abc" + t.label);
    this.tdlService.delete(t);
  }

  updateItem(t: Partial<TodoItem>, old:TodoItem){
    console.log(t.label);
    this.tdlService.update(t, old);
  }
}
