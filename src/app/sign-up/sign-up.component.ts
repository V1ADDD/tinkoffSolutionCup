import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private router:Router) {
    if (localStorage.getItem("currentUser")) {
      this.router.navigate(['/profile'])
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (form.value.password === form.value.password2) {
        const users = JSON.parse(<string>localStorage.getItem("users"));
        let id: number = 0;
        if (users.length !== 0)
          id = users[users.length - 1].id + 1;
        users.push({
          "id": id,
          "email": form.value.email,
          "fio": form.value.fio,
          "info": "",
          "password": form.value.password
        })
        let usersJson = JSON.stringify(users);
        localStorage.setItem("users", usersJson);
        form.resetForm();
      }
    }
  }
}
