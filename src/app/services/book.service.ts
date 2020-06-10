import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASIC_URL = "http://localhost:8080"
  private GET_BOOKS = `${this.BASIC_URL}/books`;
  private DELETE_AUTHOR = `${this.BASIC_URL}/books/`;
  private UPDATE_AUTHOR = `${this.BASIC_URL}/books/`;

  constructor(private http: HttpClient) { }

  getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.GET_BOOKS);
  }

  updateBook(book: Book) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));

    const body = {
      id: book.id, isbn: book.isbn, category: book.category,
      title: book.title, author: book.author, publisher: book.publisher,
      yearOfPublish: book.yearOfPublish
    }

    return this.http.put<Author>(this.UPDATE_AUTHOR + book.id, body,httpOptions);

  }

  deleteBook(id: string) {
    return this.http.delete(this.DELETE_AUTHOR + id);
  }
}
