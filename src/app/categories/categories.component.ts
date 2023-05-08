import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  constructor(private router:Router) {
    if (!localStorage.getItem("currentUser")) {
      this.router.navigate(['/signin'])
    }
  }
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const categories = JSON.parse(<string>localStorage.getItem("categories"));
      let id: number = 0;
      if (categories.length !== 0)
        id = categories[categories.length - 1].id + 1;
      categories.push({
        "id": id,
        "user": <string>localStorage.getItem("currentUser"),
        "name": form.value.category,
        "info": form.value.infoCategory
      });
      const categoriesJson = JSON.stringify(categories);
      localStorage.setItem("categories", categoriesJson);
      form.resetForm();
    }
  }
}
