import { Component } from '@angular/core';
import {User} from "./models/user";
import {SessionService} from "./services/session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user : User = null;


  constructor (private sessionService : SessionService) {

  }
  ngOnInit() {
    this.sessionService.connectionEmitter$.subscribe( //if the connection is validated
      user => {
        this.user = user;
      }
    )


  }
}
