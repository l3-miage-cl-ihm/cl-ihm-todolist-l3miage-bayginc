import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { user } from '@angular/fire/auth';
;

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

  constructor(private afs: AngularFirestore, private auth:AngularFireAuth) {
    let local : TodoItem[]= JSON.parse( localStorage.getItem("stockage") ??'[]');
    this.subj = new BehaviorSubject<TodoList>({label: 'L3 MIAGE', items:  local });
    this.observable = this.subj.asObservable();

    this.observable.subscribe((items)=>{
      localStorage.setItem("stockage", JSON.stringify(items.items));
    });


    auth.user.subscribe((user) => {
      // si on est connecter
      if (user && user.uid) { 
        // si on change sur Firebase "manuellement" on veut que cela soit mis a jour
         this.afs.doc<TodoList>(`users/${user.uid}`).valueChanges().subscribe(
          (data) => {
            if (data && !this.sontLesMeme(data.items, this.subj.value.items)) {
              this.subj.next(data);
            }
          }
        );
      }else{
        this.subj.next({label: 'L3 MIAGE', items:  [] });
      }
    });;
    
  
  }

  sontLesMeme(array1:readonly TodoItem[], array2:readonly TodoItem[]):boolean {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element.id === array2[index].id && element.isDone === array2[index].isDone && element.label === array2[index].label) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
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

    this.auth.user.subscribe((user) => {
      if (user && user.uid) {
        this.afs.doc<TodoList>(`users/${user.uid}`).set(this.subj.value);
      }
    }).unsubscribe;

    return this;
  }

  delete(...items: readonly TodoItem[]): this {
    const L = this.subj.value;
    this.subj.next( {
      ...L,
      items: L.items.filter(item => items.indexOf(item) === -1 )
    } );
    
    this.auth.user.subscribe((user) => {
      if (user && user.uid) {
        this.afs.doc<TodoList>(`users/${user.uid}`).set(this.subj.value);
      }
    }).unsubscribe; // une autre solution ? C'est laid de subscribe/unsubscribe en continu

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

    this.auth.user.subscribe((user) => {
      if (user && user.uid) {
        this.afs.doc<TodoList>(`users/${user.uid}`).set(this.subj.value);
      }
    }).unsubscribe;

    return this;
  }

}
