import { Component } from '@angular/core';
import {User} from "./models/user";
import {SessionService} from "./services/session.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user : User = null;
  private autoConnect : boolean;


  constructor (
    private userService: UserService,
    private sessionService: SessionService) {
  }

  ngOnInit() {
    this.userService.userEvent$.subscribe( //if the connection is validated
      user => {
        this.user = user;
      });
    this.autoConnect = localStorage.getItem('rememberMe') != null;

    if(!this.autoConnect) this.sessionService.signOut();

    /**
     * TODO
     * Do we want to always connect someone automatically ? where store token if no ?
     */
    let token = localStorage.getItem('session_token'); //check if already connected
    if(token != null && this.autoConnect){
      this.userService.getCurrentUser(token)
        .then(user => {
          this.userService.setCurrentUser(user);
        })
        .catch(err =>{
          this.sessionService.signOut();
          console.error(err);
        });
    }
  }

  signOut(){
    this.sessionService.signOut();
  }
}
