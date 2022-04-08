import { Component } from '@angular/core';
import { TodolistService } from './todolist.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'l3m-tpX-todolist-angular-y2022';
  liststorage = 'test';


  constructor(public tdlService: TodolistService, public auth: AngularFireAuth) {
  }


  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

}
