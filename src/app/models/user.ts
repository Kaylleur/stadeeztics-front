import {SessionResponse} from "./sessionResponse";
/**
 * Created by Thomas on 05/02/2017.
 */

export class User {


  constructor(sessionResponse : SessionResponse) {
    this.name = sessionResponse.user.name;
    this.gravatar = sessionResponse.user.gravatar;
    this._id = sessionResponse.user._id;
  }

  name : string;
  password : string;
  mail : string;
  gravatar: string;
  _id : string;
  deezerAccounts : string[];
}
