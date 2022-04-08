import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { TodoItem, TodoList, TodolistService } from '../todolist.service';

type FctFilter = (item: TodoItem) => boolean;
interface TodoListPlus extends TodoList{
  remaining: number,
  filter: FctFilter,
  displayedItems : readonly TodoItem[],
  allDone: boolean,
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class TodoListComponent implements OnInit {
  @Input() inputText: string | undefined;
  isEditing : boolean = false;
  currentEditing : number = -1;

  readonly fAll: FctFilter = () => true;
  readonly fCompleted: FctFilter = (item) => item.isDone;
  readonly fActive: FctFilter = (item) => !item.isDone;

  private filtreCourant = new BehaviorSubject<FctFilter>(this.fAll);

  readonly tdlObs : Observable<TodoListPlus>;


  constructor(public tdlService : TodolistService) {
    this.tdlObs = combineLatest([tdlService.observable, this.filtreCourant]).pipe(
      map( ([L,f]) => ({
        ...L,
        remaining: L.items.reduce( (nb,item) => item.isDone ? nb : nb+1, 0),
        filter: f,
        displayedItems : L.items.filter(f),
      })),
      map( inter =>  ({
        ...inter,
        allDone: inter.remaining === 0,
      }))
    );
   }

  ngOnInit(): void {
  }
  onSubmit(data:HTMLInputElement){
    this.tdlService.create(data.value);
    data.value = "";
  }

  updateAllDone(done: boolean, L: readonly TodoItem[]): void{
    this.update({isDone : done}, ...L);
  }

  update(update:Partial<TodoItem>, ...items : TodoItem[]){
    this.tdlService.update(update,...items);
  }

  remove(...items : TodoItem[]){
    this.tdlService.delete(...items);
  }

  removeCompleted(L : readonly TodoItem[]){
    this.tdlService.delete(...L.filter((item)=> this.fCompleted(item)));
  }

  updateLabel(event:string, item : TodoItem){
    this.tdlService.update({label:event},item);
  }
  trackById(i:number, e:TodoItem): number{
    return e.id;
  }

  setFilter(f:FctFilter) : void{
    this.filtreCourant.next(f);
  }

  toggleEdit(b : boolean, id : number) : void{
    this.isEditing= b;
    this.currentEditing = id;
  }

}
