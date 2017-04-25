import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {SessionResponse} from '../models/sessionResponse';
import {SessionRequest} from '../models/sessionRequest';

import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs';
import {SignUpRequest} from '../models/signUpRequest';
import {User} from '../models/user';
import {environment} from "../../environments/environment.dev";
import {DefaultService} from "./defaultService";
import {UserService} from "./user.service";
import {Router} from "@angular/router"; //TODO should not be dev or prod

@Injectable()
export class SessionService {

  private sessionUrl: string;

  private headers : Headers;


  constructor(private http: Http,
              private userService : UserService,
              private router : Router) {
    this.sessionUrl = environment.apiUrl + '/session';
  }

  signIn(req: SessionRequest): Promise<SessionResponse> {
    return this.http.post(this.sessionUrl + '/signIn' , req, {headers: this.headers})
      .toPromise()
      .then(res => {
        let sessionResponse = <SessionResponse> res.json();
        localStorage.setItem('session_token' , sessionResponse.token);
        localStorage.setItem('userId' , sessionResponse.user._id);
        localStorage.setItem('userName' , sessionResponse.user.name);
        return sessionResponse;
      })
      .catch(DefaultService.handleError);
  }

  signUp(req: SignUpRequest): Promise<User> {
    return this.http.post(this.sessionUrl, req, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(DefaultService.handleError);
  }

  checkToken(token : string): Promise<Response> { //check if used TODO
    this.headers= new Headers({'x-access-token': token});
    return this.http.get(this.sessionUrl + '/checkToken', {headers : this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(DefaultService.handleError);
  }

  checkTokenAuthGuard(token: string):Promise<boolean> {
    this.headers= new Headers({'x-access-token': token});
    return this.http.get(this.sessionUrl + '/checkToken', {headers : this.headers})
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  signOut(){
    this.userService.setCurrentUser(null);

    localStorage.removeItem('session_token');
    localStorage.removeItem('rememberMe');
    this.router.navigate(['/home']);
  }
}
