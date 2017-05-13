import {Response} from "@angular/http";
import {Observable} from "rxjs";
/**
 * Created by Thomas on 12/02/2017.
 */
export class DefaultService {

  public static handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(JSON.parse(error._body));
  }


  public static extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
