import { Component, OnInit } from '@angular/core';
import {Book} from '../model/book';
import {BookService} from '../services/book.service';
import {Role} from "../model/role.enum";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import {AuthorEditComponent} from "../authors/author-edit/author-edit.component";
import {BookEditComponent} from "./book-edit/book-edit.component";
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  columnsToDisplay = ['title','lastName', 'actions'];
  currentUser: User;
  constructor(private bookService: BookService, public authenticationService: AuthenticationService,
              public dialog:MatDialog) {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x)
  }

  ngOnInit(): void {
    this.isAdmin();
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
    this.columnsToDisplay = this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ? this.columnsToDisplay : this.columnsToDisplay.filter(column => column !== 'actions');
  }

  onEdit(book: Book) {
    this.dialog.open(BookEditComponent, {
      data: {
        id: book.id,
        isbn: book.isbn,
        category: book.category,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        yearOfPublish: book.yearOfPublish
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  onDelete(id: string) {
    this.bookService.deleteBook(id).subscribe(
      result => this.refresh(),
      err => console.error(err)
    );
  }

  refresh() {
    this.bookService.getAllBooks().subscribe(
      res=> {
        this.books = res;
      },
      err=>{
        console.log(err);
        alert("Error with get books");
      }
    )
  }
}
