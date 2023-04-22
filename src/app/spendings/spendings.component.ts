import { Component } from '@angular/core';

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

  constructor() {
    const categories: Category[] = JSON.parse(<string>localStorage.getItem("categories"));
    this.categories = categories.filter((x: Category) => x.user == localStorage.getItem("currentUser"));
    const spendings: Spending[] = JSON.parse(<string>localStorage.getItem("spendings"));
    this.spendings = spendings.filter((x: Spending) => x.user == localStorage.getItem("currentUser"));
  }

  updateCategories(): void {

  }
}
