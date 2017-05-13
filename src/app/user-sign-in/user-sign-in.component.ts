import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {User} from "../models/user";
import {SignInRequest} from "../models/signInRequest";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";
import {SessionResponse} from "../models/sessionResponse";


@Component({
  selector: 'user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})
export class UserSignInComponent implements OnInit {
    @ViewChild('btnClose') closeBtn: ElementRef;

    private errorMsg : string = '';

  constructor(
      private sessionService : SessionService,
      private userService : UserService,
      private router : Router) { }

  ngOnInit() {
  }


  signIn(mail: string, password: string,rememberMe: boolean) {
    this.errorMsg = '';
      let signInRequest = new SignInRequest(mail, password);
    this.sessionService.signIn(signInRequest)
        .subscribe(
            (sessionResponse:SessionResponse) => {
              this.userService.setCurrentUser(new User(sessionResponse),sessionResponse.token,rememberMe);
              this.router.navigate(['/dashboard']);
              this.closeBtn.nativeElement.click();
            },
            err => {
                this.errorMsg = err.message;
            });
  }


    hideError(){
      this.errorMsg = '';
    }
}
