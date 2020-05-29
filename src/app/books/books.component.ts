import { Component, OnInit } from '@angular/core';
import {PublisherService} from '../services/publisher.service';
import {Book} from '../model/book';
import {BookService} from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService) { }

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

}
