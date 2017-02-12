import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../services/session.service";
import {SessionRequest} from "../models/sessionRequest";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private formConnection : boolean;

  constructor(
    private sessionService : SessionService,
    private userService : UserService,
    private router : Router) {
  }

  ngOnInit() {
    this.formConnection = localStorage.getItem('session_token') == null;
    this.userService.userEvent$.subscribe(
      user => {
        this.formConnection = user == null;
      });

  }

  signIn(mail: string, password: string) {
    let sessionRequest = new SessionRequest(mail, password);
    this.sessionService.signIn(sessionRequest)
      .then(sessionResponse => {
        this.userService.setCurrentUser(sessionResponse.user);
        this.router.navigate(['/dashboard'])
      });
  }
}
