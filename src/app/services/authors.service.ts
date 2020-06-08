import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/authors`;

  constructor(private http: HttpClient) { }

  getAllAuthors() : Observable<Author[]> {
    return this.http.get<Author[]>(this.GET_PUBLISHERS);
  }
}
