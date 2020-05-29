import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/books`;

  constructor(private http: HttpClient) { }

  getAllBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(this.GET_PUBLISHERS);
  }
}
