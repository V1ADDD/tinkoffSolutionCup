import { Component } from '@angular/core';

type User = {
    id: number;
    email: string;
    fio: string;
    info: string;
    password: string;
}

type Category = {
    id: number;
    user: number;
    name: string;
    info: string;
}

type Spending = {
    id: number;
    user: number;
    category: number;
    spent: number;
    date: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  users: User[];
  categories: Category[];
  spendings: Spending[];

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
    this.categories = [
      {
        "id": 0,
        "user": 0,
        "name": "Магазин",
        "info": "Закупка в местном магазине"
      },
    ];
    this.spendings = [
      {
        "id": 0,
        "user": 0,
        "category": 0,
        "spent": 123.45,
        "date": "2023-04-20"
      },
    ];

    let usersJson = JSON.stringify(this.users);
    let categoriesJson = JSON.stringify(this.categories);
    let spendingsJson = JSON.stringify(this.spendings);

    localStorage.setItem("users", usersJson);
    localStorage.setItem("categories", categoriesJson);
    localStorage.setItem("spendings", spendingsJson);

  }
}
