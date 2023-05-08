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
  users: User[] = [];
  categories: Category[] = [];
  spendings: Spending[] = [];

  constructor() {
    let usersJson = JSON.stringify(this.users);
    let categoriesJson = JSON.stringify(this.categories);
    let spendingsJson = JSON.stringify(this.spendings);

    if (!localStorage.getItem("users"))
      localStorage.setItem("users", usersJson);
    if (!localStorage.getItem("categories"))
      localStorage.setItem("categories", categoriesJson);
    if (!localStorage.getItem("spendings"))
      localStorage.setItem("spendings", spendingsJson);
  }
}
