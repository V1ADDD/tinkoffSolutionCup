import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

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
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.css']
})
export class SpendingsComponent {
  categoryModel: any;
  categories: Category[];
  spendings: Spending[];
  spentAll: number = 0;
  datesOfSpends: string[] = [];

  constructor() {
    const categories: Category[] = JSON.parse(<string>localStorage.getItem("categories"));
    this.categories = categories.filter((x: Category) => x.user == localStorage.getItem("currentUser"));
    const spendings: Spending[] = JSON.parse(<string>localStorage.getItem("spendings"));
    this.spendings = spendings.filter((x: Spending) => x.user == localStorage.getItem("currentUser"));
    for (const spend of this.spendings) {
      this.datesOfSpends.push(spend.date.slice(-2));
      this.spentAll += spend.spent;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      let summ: number = 0;
      for (const spend of this.spendings) {
        const dateOfSpend = new Date(spend.date);
        if (dateOfSpend >= new Date(form.value.from) && dateOfSpend <= new Date(form.value.to)) {
          summ += spend.spent;
        }
      }
      alert("Потрачено за указанный период: "+summ);
    }
  }
}
