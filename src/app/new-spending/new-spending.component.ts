import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

type Category = {
    id: number;
    user: string;
    name: string;
    info: string;
}

@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.css']
})
export class NewSpendingComponent {
  categories: Category[];
  constructor(private router:Router) {
    if (!localStorage.getItem("currentUser")) {
      this.router.navigate(['/signin'])
    }
    const categories: Category[] = JSON.parse(<string>localStorage.getItem("categories"));
    this.categories = categories.filter((x: Category) => x.user == localStorage.getItem("currentUser"));
  }

  onSubmit(form: NgForm) {
    if (form.valid && form.value.category) {
      const spendings = JSON.parse(<string>localStorage.getItem("spendings"));
      let id: number = 0;
      if (spendings.length !== 0)
        id = spendings[spendings.length - 1].id + 1;
      spendings.push({
        "id": id,
        "user": localStorage.getItem("currentUser"),
        "category": form.value.category,
        "spent": form.value.summ,
        "date": form.value.dateSpent
      });
      const spendingsJson = JSON.stringify(spendings);
      localStorage.setItem("spendings", spendingsJson);
      form.resetForm();
    }
  }
}
