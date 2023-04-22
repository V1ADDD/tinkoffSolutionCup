import { Component } from '@angular/core';

type User = {
    id: number;
    email: string;
    fio: string;
    info: string;
    password: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;
  constructor() {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("users"))[<number>localStorage.getItem("currentUser")];
  }
}
