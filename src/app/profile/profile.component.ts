import {Component, OnInit, Input} from '@angular/core';
import {User} from "../models/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private user: User;

  constructor(
  ) { }

  ngOnInit() {
    this.user = new User();
    this.user._id = "yesy";

    setTimeout(function () {
      this.user = new User();
      this.user._id = "yesy";
    },2000);
  }

}
