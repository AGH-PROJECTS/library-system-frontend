import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {last} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private BASIC_URL = "http://localhost:8080"
  private GET_AUTHORS = `${this.BASIC_URL}/authors`;
  private DELETE_AUTHOR = `${this.BASIC_URL}/authors/`;
  private UPDATE_AUTHOR = `${this.BASIC_URL}/authors/`;
  private ADD_AUTHOR = `${this.BASIC_URL}/authors`;
  constructor(private http: HttpClient) { }

  getAllAuthors() : Observable<Author[]> {
    return this.http.get<Author[]>(this.GET_AUTHORS);
  }

  deleteAuthor(authorId) {
    return this.http.delete(this.DELETE_AUTHOR + authorId);
  }

  updateAuthor(author: Author) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));

    const body = {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      dateOfBirth: author.dateOfBirth
    }

    console.log(httpOptions.headers);
    return this.http.put<Author>(this.UPDATE_AUTHOR + author.id, body,httpOptions);
  }

  addAuthor(firstName: string, lastName: string, birthDate: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));
    const body = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: birthDate
    }

    console.log(httpOptions.headers);
    return this.http.post<Author>(this.ADD_AUTHOR, body,httpOptions);
  }
}
