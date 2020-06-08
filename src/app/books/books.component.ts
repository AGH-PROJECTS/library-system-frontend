import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../services/book.service';
import {Role} from "../model/role.enum";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  currentUser: User;
  constructor(private bookService: BookService, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x)
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks() {
    this.bookService.getAllBooks().subscribe(
      res => {
        this.books = res;
      },
      err => {
        console.log(err);
        alert("Error with get books");
      }
    )
  }

  isAdmin() {
    console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN))
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ;
  }
}
