import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../todolist.service';

@Component({
  selector: 'app-todo-item', 
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() value! : TodoItem;
  @Output() update = new EventEmitter<Partial<TodoItem>>();
  @Output() remove = new EventEmitter<TodoItem>();
  @Output() edit = new EventEmitter<[boolean, number]>();

  constructor() {
    
  }

  ngOnInit(): void {
  }

  removeItem(){
    this.remove.emit(this.value);
  }

  toggle() : void{
    this.edit.emit([true,this.value.id]);
  }

  UPDATE(item : Partial<TodoItem>) : void{
    this.update.emit(item);
    this.edit.emit([false,-1]);
  }

}
