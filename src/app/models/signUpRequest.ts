/**
 * Created by Thomas on 05/02/2017.
 */
export class SignUpRequest {

  name : string;
  password : string;
  mail : string;


  constructor(name: string, password: string, mail: string) {
    this.name = name;
    this.password = password;
    this.mail = mail;
  }
}
