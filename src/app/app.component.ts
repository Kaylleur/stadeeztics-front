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


  constructor (
    private sessionService: SessionService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.userService.userEvent$.subscribe( //if the connection is validated
      user => {
        this.user = user;
      });

    /**
     * TODO
     * Do we want to always connect someone automatically ? where store token if no ?
     */
    let token = localStorage.getItem('session_token'); //check if already connected
    if(token){
      this.userService.getCurrentUser(token)
        .then(user => {
          this.userService.setCurrentUser(user);
        })
        .catch(err =>{
          this.signOut();
          console.error(err);
        });
    }
  }

  signOut(){
    this.userService.setCurrentUser(null);

    localStorage.removeItem('session_token');
    this.router.navigate(['/home']);
  }

}
