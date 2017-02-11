import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {SessionResponse} from '../models/sessionResponse';
import {SessionRequest} from '../models/sessionRequest';

import 'rxjs/add/operator/toPromise';
import {Observable, Subject} from 'rxjs';
import {SignUpRequest} from '../models/signUpRequest';
import {User} from '../models/user';
import {environment} from "../../environments/environment.dev"; //TODO should not be dev or prod

@Injectable()
export class SessionService {

  private sessionUrl;

  private headers = new Headers({'Content-Type': 'application/json'});
  private connectionEmitter = new Subject<User>(); //source

  connectionEmitter$ = this.connectionEmitter.asObservable();

  constructor(private http: Http) {
    this.sessionUrl = environment.apiUrl + '/session';
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  signIn(req: SessionRequest): Promise<SessionResponse> {
    return this.http.post(this.sessionUrl + '/signIn' , JSON.stringify(req), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  signUp(req: SignUpRequest): Promise<User> {
    return this.http.post(this.sessionUrl, JSON.stringify(req), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  checkToken(token : string): Promise<Response> {
    this.headers.append('x-access-token', token);
    return this.http.get(this.sessionUrl + '/checkToken', {headers : this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  connectionValid(user : User){
    this.connectionEmitter.next(user);
  }
}
