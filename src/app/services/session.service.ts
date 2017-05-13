import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {SessionResponse} from '../models/sessionResponse';
import {SignInRequest} from '../models/signInRequest';

import 'rxjs/add/operator/toPromise';
import {SignUpRequest} from '../models/signUpRequest';
import {User} from '../models/user';
import {environment} from "../../environments/environment.dev";
import {DefaultService} from "./defaultService";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs"; //TODO should not be dev or prod

@Injectable()
export class SessionService {

  private sessionUrl: string;

  private headers : Headers;


  constructor(private http: Http,
              private userService : UserService,
              private router : Router) {
    this.sessionUrl = environment.apiUrl + '/session';
  }

  signIn(req: SignInRequest): Observable<SessionResponse> {
    return this.http.post(this.sessionUrl + '/signIn' , req, {headers: this.headers})
      .map(DefaultService.extractData)
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
