import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../services/session.service";
import {SessionRequest} from "../models/sessionRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private sessionService : SessionService,
    private router : Router) {
  }

  ngOnInit() {

  }

  signIn(mail: string, password: string) {
    let sessionRequest = new SessionRequest(mail, password);
    this.sessionService.signIn(sessionRequest)
      .then(sessionResponse => {
        localStorage.setItem('session_token' , sessionResponse.token);
        localStorage.setItem('userId' , sessionResponse.user._id);
        localStorage.setItem('userName' , sessionResponse.user.name);

        this.sessionService.connectionValid(sessionResponse.user);

        this.router.navigate(['/dashboard'])
      });
  }

}
