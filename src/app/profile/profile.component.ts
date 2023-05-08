import { Component } from '@angular/core';
import {Router} from "@angular/router";

type User = {
    id: number;
    email: string;
    fio: string;
    info: string;
    password: string;
}

type Category = {
  id: number;
  user: string;
  name: string;
  info: string;
}

type Spending = {
  id: number;
  user: string;
  category: number;
  spent: number;
  date: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;
  constructor(private router:Router) {
    if (!localStorage.getItem("currentUser")) {
      this.router.navigate(['/signin'])
    }
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("users"))[<number>localStorage.getItem("currentUser")];
  }
  exitAccount() {
    if (confirm("Вы уверены, что хотите выйти?")) {
      localStorage.setItem("currentUser", "");
      window.location.href = "";
    }
  }
  deleteUser() {
    if (confirm("Вы уверены, что хотите удалить пользователя и всю информацию о нем?")) {
      const id: number = this.user.id;
      localStorage.setItem("users", JSON.stringify(
        JSON.parse(<string>localStorage.getItem("users")).filter((x: User) => x.id != id)
      ));
      localStorage.setItem("categories", JSON.stringify(
        JSON.parse(<string>localStorage.getItem("categories")).filter((x: Category) => x.user != id.toString())
      ));
      localStorage.setItem("spendings", JSON.stringify(
        JSON.parse(<string>localStorage.getItem("spendings")).filter((x: Spending) => x.user != id.toString())
      ));
      localStorage.setItem("currentUser", "");
      window.location.href = "";
    }
  }
}
