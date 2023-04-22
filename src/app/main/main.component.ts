import { Component } from '@angular/core';

type User = {
    id: number;
    email: string;
    fio: string;
    info: string;
    password: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  users: User[];
  constructor() {
    this.users = [
      {
        "id": 0,
        "email": "admin@tinkoff.ru",
        "fio": "admin",
        "info": "",
        "password": "admin"
      },
    ];
    let usersJson = JSON.stringify(this.users);
    localStorage.setItem("users", usersJson);
    this.users = JSON.parse(<string>localStorage.getItem("users"));
    console.log(this.users)

  }
}
