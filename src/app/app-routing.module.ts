import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksComponent} from './books/books.component';
import {LoginRegisterComponent} from './login-register/login-register.component';

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'login-register', component: LoginRegisterComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
