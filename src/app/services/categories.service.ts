import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private BASIC_URL = "http://localhost:8080"
  private GET_CATEGORIES = `${this.BASIC_URL}/categories`;
  private DELETE_CATEGORY = `${this.BASIC_URL}/categories/`;
  private UPDATE_CATEGORY = `${this.BASIC_URL}/categories/`;
  private ADD_CATEGORY = `${this.BASIC_URL}/categories`;
  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(this.GET_CATEGORIES);
  }

  deleteCategory(id: string) {
    return this.http.delete(this.DELETE_CATEGORY + id);
  }

  updateCategory(category: Category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));

    const body = {
      id: category.id,
      name: category.name
    }

    console.log(httpOptions.headers);
    return this.http.put<Category>(this.ADD_CATEGORY + category.id, body,httpOptions);
  }

  addAuthor(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));

    const body = {
      name: name
    }

    console.log(httpOptions.headers);
    return this.http.post<Category>(this.ADD_CATEGORY, body,httpOptions);
  }
}
