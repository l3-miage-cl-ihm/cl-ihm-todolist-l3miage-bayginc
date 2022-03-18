import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HistoryService } from './history.service';

export interface TodoItem {
  readonly label: string;
  readonly isDone: boolean;
  readonly id: number;
}


export interface TodoList {
  readonly label: string;
  readonly items: readonly TodoItem[];
}

let idItem = 0;

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private subj;
  readonly observable;

  constructor() {
    let local : TodoItem[]= JSON.parse(localStorage.getItem("stockage") ??"");
    this.subj = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items:  local });
    this.observable = this.subj.asObservable();

    this.observable.subscribe((items)=>{
      localStorage.setItem("stockage", JSON.stringify(items.items));
      console.log(items);
    });
  }

  create(...labels: readonly string[]): this {
    const L: TodoList = this.subj.value;
    this.subj.next( {
      ...L,
      items: [
        ...L.items,
        ...labels.filter( l => l !== '').map(
            label => ({label, isDone: false, id: idItem++})
          )
      ]
    } );
    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );


    return this;
  }

  update(data: Partial<TodoItem>, ...items: readonly TodoItem[]): this {
    if(data.label !== "") {
      const L = this.subj.value;
      this.subj.next( {
        ...L,
        items: L.items.map( item => items.indexOf(item) >= 0 ? {...item, ...data} : item )
      } );
    } else {
      this.delete(...items);
    }
    return this;
  }

}
