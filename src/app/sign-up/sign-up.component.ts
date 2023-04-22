import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  onSubmit(form: NgForm) {
    if (form.valid) {
      if (form.value.password === form.value.password2) {
        const users = JSON.parse(<string>localStorage.getItem("users"));
        const id = users[users.length - 1].id + 1;
        users.push({
          "id": id,
          "email": form.value.email,
          "fio": form.value.fio,
          "info": "",
          "password": form.value.password
        })
        let usersJson = JSON.stringify(users);
        localStorage.setItem("users", usersJson);
        console.log(<string>localStorage.getItem("users"));
        form.resetForm();
      }
    }
  }
}
