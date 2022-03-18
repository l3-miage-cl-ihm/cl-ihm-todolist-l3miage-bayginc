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
  editText="";

  constructor() {
    
  }

  ngOnInit(): void {
  }

  removeItem(){
    this.remove.emit(this.value);
  }

  updateItem(){
    this.update.emit( {...this.value,label:this.editText } as Partial<TodoItem>);
  }

}
