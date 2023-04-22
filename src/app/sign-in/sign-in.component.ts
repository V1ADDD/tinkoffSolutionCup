import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

type User = {
    id: number;
    email: string;
    fio: string;
    info: string;
    password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private router: Router) {
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      const users = JSON.parse(<string>localStorage.getItem("users"));
      const user = users.find((x: User) => x.email === form.value.email);
      if (user) {
        if (user.password === form.value.password) {
          localStorage.setItem("currentUser", user.id);
          this.router.navigate(['/profile'])
        }
      }
    }
  }
}
