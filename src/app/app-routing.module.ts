import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BooksComponent} from './books/books.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {AuthorsComponent} from './authors/authors.component';
import {OrdersComponent} from './orders/orders.component';
import {UsersComponent} from './users/users.component';
import {PublishersComponent} from './publishers/publishers.component';
import {CategoriesComponent} from './categories/categories.component';
import {AuthGuard} from "./auth.guard";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import { Role } from "./model/role.enum";
import {UserPanelComponent} from "./user-panel/user-panel.component";

const routes: Routes = [
  {path: '', redirectTo: '/login-register', pathMatch: 'full' },
  {path: 'books', component: BooksComponent},
  {path: 'login-register', component: LoginRegisterComponent},
  {path: 'authors', component: AuthorsComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'publishers', component: PublishersComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN]}},
  {path: 'user', component: UserPanelComponent, canActivate: [AuthGuard], data: { roles: [Role.USER]}}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
