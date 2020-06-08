import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/categories`;

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_PUBLISHERS);
  }
}
