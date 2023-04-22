import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const categories = JSON.parse(<string>localStorage.getItem("categories"));
      categories.push({
        "id": categories[categories.length - 1].id + 1,
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
