import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private sessionService: SessionService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    let token = localStorage.getItem('session_token'); //check if already connected

    if(token){
      return this.sessionService.checkTokenAuthGuard(token);
    }else{
      console.warn('user not authenticated, redirecting to home');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
