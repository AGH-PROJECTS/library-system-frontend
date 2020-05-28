import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Publisher} from '../model/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/publishers`;

  constructor(private http: HttpClient) { }

  getAllPublishers() : Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.GET_PUBLISHERS);
  }

}
