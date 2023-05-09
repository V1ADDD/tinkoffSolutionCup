import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Router} from "@angular/router";

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
export class SpendingsComponent implements AfterViewInit {
  categoryModel: any;
  fromDateModel: any;
  toDateModel: any;

  categories: Category[];
  spendings: Spending[];

  listSpendByMonth: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  listCategories: string[] = [];
  listCategoriesValues: number[] = [];

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef | undefined;
  doughnutChart: any;

  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;

  constructor(private router:Router) {
    if (!localStorage.getItem("currentUser")) {
      this.router.navigate(['/signin'])
    }
    const categories: Category[] = JSON.parse(<string>localStorage.getItem("categories"));
    this.categories = categories.filter((x: Category) => x.user == localStorage.getItem("currentUser"));
    const spendings: Spending[] = JSON.parse(<string>localStorage.getItem("spendings"));
    this.spendings = spendings.filter((x: Spending) => x.user == localStorage.getItem("currentUser"));
    let currentDate: Date = new Date();
    for (let category of this.categories) {
      this.listCategories.push(category.name);
      this.listCategoriesValues.push(0);
    }
    for (let spending of this.spendings) {
      if (spending.date.slice(0,4) == currentDate.getFullYear().toString()) {
        // @ts-ignore
        this.listSpendByMonth[spending.date.slice(5, 7).split('0')[1]|spending.date.slice(5, 7).split('0')[0]] += spending.spent;
        for (let i = 0; i<this.listCategories.length; i++) {
          if (spending.category == i) {
            this.listCategoriesValues[i] += spending.spent;
          }
        }
      }
    }
    this.listSpendByMonth.shift();
  }

  ngAfterViewInit() {
    this.doughnutChartMethod();
    this.lineChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas?.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.listCategories,
        datasets: [
          {
            label: ' потрачено',
            data: this.listCategoriesValues,
            backgroundColor: 'rgba(255, 255, 0, 0.43)',
            hoverBackgroundColor: 'rgba(255, 255, 0, 0.33)',
            hoverBorderColor: 'rgba(255, 255, 0)',
          },
        ],
      },
    });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        datasets: [
          {
            label: 'Потрачено за месяц',
            fill: true,
            backgroundColor: 'rgba(255, 255, 0, 0.33)',
            borderColor: 'rgb(255,255,255)',
            borderCapStyle: 'butt',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(255, 255, 255)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(255, 255, 255)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.listSpendByMonth,
            spanGaps: false,
          },
        ],
      },
    });
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
      alert("Потрачено за указанный период: " + summ);
    }
  }

  exportToCsv(): void {
    let spendingsToCSV: object[] = [];
    for (let spending of this.spendings) {
      if ((!this.categoryModel || this.categoryModel==spending.category) && (!this.toDateModel
        || spending.date<=this.toDateModel) && (!this.fromDateModel || spending.date>=this.fromDateModel))
        spendingsToCSV.push({
          category: this.categories[spending.category].name,
          spent: spending.spent,
          date: spending.date
        })
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(spendingsToCSV);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], {type: 'text/csv'});
    FileSaver.saveAs(blob, 'export.csv');
  }
}
