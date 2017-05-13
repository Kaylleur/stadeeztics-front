import { Injectable } from '@angular/core';
import {Headers, Http, Response, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment.dev";
import {Observable, Subject} from "rxjs";
import {User} from "../models/user";
import {DefaultService} from "./defaultService";

@Injectable()
export class UserService {

  private userUrl: string;

  private headers : Headers;

  private currentUser: User;
  private userEvent = new Subject<User>();

  //observable
  userEvent$ = this.userEvent.asObservable();


  constructor(private http: Http) {
    this.userUrl = environment.apiUrl + '/user';
  }

  getCurrentUser(token : string):Promise<User> {
    if(this.currentUser != null) return new Promise(res => this.currentUser);
    this.headers = new Headers({'x-access-token': token});
    return this.http.get(this.userUrl, new RequestOptions({method: 'GET',headers: this.headers}))
      .toPromise()
      .then(res => res.json());
      // .catch(DefaultService.handleError);
  }

  setCurrentUser(user : User,token? : string,rememberMe? : boolean){
    if(user) {
      this.currentUser = user;
      localStorage.setItem('userId', user._id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('gravatar',user.gravatar);
      if(token) localStorage.setItem('session_token',token);
      if(rememberMe) localStorage.setItem("rememberMe","auto log in");
    }
    this.userEvent.next(user);
  }
}
