/**
 * Created by Thomas on 04/02/2017.
 */
export class SessionRequest {

  mail : string;
  password : string;


  constructor(mail: string, password: string) {
    this.mail = mail;
    this.password = password;
  }
}
