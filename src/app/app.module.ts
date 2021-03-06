import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from "@angular/material/table";
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { BooksComponent } from './books/books.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { PublishersComponent } from './publishers/publishers.component';
import { UsersComponent } from './users/users.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from "./auth.guard";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { JwtInterceptorInterceptor} from "./interceptor/jwt-interceptor.interceptor";
import { ErrorInterceptorInterceptor} from "./interceptor/error-interceptor.interceptor";
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AuthorEditComponent } from './authors/author-edit/author-edit.component';
import { MatDialogModule } from "@angular/material/dialog";
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { PublisherEditComponent } from './publishers/publisher-edit/publisher-edit.component';
import { AuthorAddComponent } from './authors/author-add/author-add.component';
import { registerLocaleData } from '@angular/common';
import localePL from '@angular/common/locales/pl';
import { CategoryAddComponent } from './categories/category-add/category-add.component';
import { PublisherAddComponent } from './publishers/publisher-add/publisher-add.component';
registerLocaleData(localePL, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksComponent,
    LoginRegisterComponent,
    AuthorsComponent,
    CategoriesComponent,
    OrdersComponent,
    PublishersComponent,
    UsersComponent,
    BookComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AuthorEditComponent,
    BookEditComponent,
    CategoryEditComponent,
    PublisherEditComponent,
    AuthorAddComponent,
    CategoryAddComponent,
    PublisherAddComponent
  ],
  imports: [
      MatTableModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MatToolbarModule,
      MatButtonModule,
      AppRoutingModule,
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatIconModule,
      MatTabsModule,
      MatCheckboxModule,
      HttpClientModule,
      ReactiveFormsModule,
      MatDialogModule
    ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
