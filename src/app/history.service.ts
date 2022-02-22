import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService<T>{
  pileRedo : T[] = [];
  pileUndo : T[] = [];
  public serviceUndoD: any;
 
  constructor(private serviceUndo: BehaviorSubject<T>) { 
  }

}
