import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {SessionResponse} from "../models/sessionResponse";
import {SessionRequest} from "../models/sessionRequest";

import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {SignUpRequest} from "../models/signUpRequest";
import {User} from "../models/user";

@Injectable()
export class SessionService {

  private sessionUrl = 'http://127.0.0.1:3000/session'; //TODO Should add first part into a conf

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

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


  signIn(req: SessionRequest):Promise<SessionResponse> {
    return this.http.post(this.sessionUrl + '/signIn' , JSON.stringify(req),{headers:this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }


  signUp(req: SignUpRequest):Promise<User>{
    return this.http.post(this.sessionUrl,JSON.stringify(req),{headers:this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  checkToken(token : string): Promise<Response>{
    this.headers.append("x-access-token",token);
    return this.http.get(this.sessionUrl + '/checkToken',{headers : this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
}
