import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksComponent} from './books/books.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {AuthorsComponent} from './authors/authors.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {PublishersComponent} from './publishers/publishers.component';
import {CategoriesComponent} from './categories/categories.component';

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'login-register', component: LoginRegisterComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'users', component: UsersComponent},
  {path: 'publishers', component: PublishersComponent},
  {path: 'categories', component: CategoriesComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
