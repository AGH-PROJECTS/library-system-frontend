import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Publisher} from '../model/publisher';
import {Category} from "../model/category";
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/publishers`;
  private DELETE_PUBLISHER = `${this.BASIC_URL}/publishers/`;
  private UPDATE_PUBLISHER = `${this.BASIC_URL}/publishers/`;
  private ADD_PUBLISHER = `${this.BASIC_URL}/publishers`;
  constructor(private http: HttpClient) { }

  getAllPublishers() : Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.GET_PUBLISHERS);
  }

  deletePublisher(id: string) {
    return this.http.delete(this.DELETE_PUBLISHER + id);
  }

  updatePublisher(publisher: Publisher) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
      })
    };

    httpOptions.headers = httpOptions.headers.set('Authorization',localStorage.getItem('currentUser'));

    const body = {
      id: publisher.id,
      name: publisher.name
    }

    console.log(httpOptions.headers);
    return this.http.put<Publisher>(this.UPDATE_PUBLISHER + publisher.id, body,httpOptions);
  }

  addPublisher(name: string) {
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
    return this.http.post<Publisher>(this.ADD_PUBLISHER, body,httpOptions);
  }

}
