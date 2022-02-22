import { Component, Input } from '@angular/core';
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

  constructor(public tdlService: TodolistService) {
    
  }



  onSumbit(donne: NgForm) {
    this. tdlService.create(donne.value['monitem']);
  }


  trackById(i: number, e:TodoItem):number{
    return e.id;
  }


}
