import {User} from "./user";
/**
 * Created by Thomas on 04/02/2017.
 */
export class SessionResponse {
  token : string;
  user : {
    _id : string,
    name : string,
    gravatar : string
  };
}
