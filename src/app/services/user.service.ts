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
    this.headers = new Headers({'x-access-token': token});
    return this.http.get(this.userUrl, new RequestOptions({method: 'GET',headers: this.headers}))
      .toPromise()
      .then(res => res.json())
      .catch(DefaultService.handleError);
  }

  setCurrentUser(user : User){
    this.currentUser = user;
    localStorage.setItem('userId' , user._id);
    localStorage.setItem('userName' , user.name);
    this.userEvent.next(user);
  }
}
