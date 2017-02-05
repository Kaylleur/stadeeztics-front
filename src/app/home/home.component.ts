import { Component, OnInit } from '@angular/core';
import {SessionService} from "../services/session.service";
import {SessionRequest} from "../models/sessionRequest";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sessionService : SessionService) {

  }

  ngOnInit() {
  }


  signIn(mail : string, password : string) {
    let sessionRequest = new SessionRequest(mail,password); //TODO get value from html DOM
    this.sessionService.signIn(sessionRequest)
      .then(token => {
        localStorage.setItem("session_token" , token.token);
      })
  }

}
