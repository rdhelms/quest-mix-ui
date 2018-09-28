import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session-manager',
  templateUrl: './session-manager.component.html',
  styleUrls: ['./session-manager.component.css']
})
export class SessionManagerComponent implements OnInit {
  signedIn = false;

  constructor() { }

  ngOnInit() {
  }

  signIn() {
    this.signedIn = true;
  }

  signOut() {
    this.signedIn = false;
  }

}
