import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component"
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ProfileComponent} from "./profile/profile.component";
import {SpendingsComponent} from "./spendings/spendings.component";
import {NewSpendingComponent} from "./new-spending/new-spending.component";
import {CategoriesComponent} from "./categories/categories.component";

const routes: Routes = [
  {
    path: '',
    title: 'Главная страничка',
    component: MainComponent
  },
  {
    path: 'tinkoffSolutionCup/signup',
    title: 'Страничка регистрации',
    component: SignUpComponent
  },
  {
    path: 'tinkoffSolutionCup/signin',
    title: 'Страничка входа',
    component: SignInComponent
  },
  {
    path: 'tinkoffSolutionCup/profile',
    title: 'Ваш аккаунт',
    component: ProfileComponent
  },
  {
    path: 'tinkoffSolutionCup/spendings',
    title: 'Ваши расходы',
    component: SpendingsComponent
  },
  {
    path: 'tinkoffSolutionCup/newspending',
    title: 'Добавить расход',
    component: NewSpendingComponent
  },
  {
    path: 'tinkoffSolutionCup/categories',
    title: 'Добавить категорию расходов',
    component: CategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
