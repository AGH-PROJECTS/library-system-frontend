import {Component, Inject, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  private book: Book;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bookService: BookService) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.book = {id: this.data.id, isbn: this.data.isbn, category: this.data.category,
    title: this.data.title, author: this.data.author, publisher: this.data.publisher,
      yearOfPublish: this.data.yearOfPublish};

    this.bookService.updateBook(this.book).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    );
  }

}
