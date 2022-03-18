import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HistoryService } from './history.service';
import { TodoItem, TodolistService } from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
  @Input() inputText: string | undefined;
  liststorage = 'test';

  @Output() play = new EventEmitter<number>();

  constructor(public tdlService: TodolistService) {
     
  }

}
