import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private BASIC_URL = "http://localhost:8080"
  private GET_PUBLISHERS = `${this.BASIC_URL}/orders`;

  constructor(private http: HttpClient) { }

  getAllOrders() : Observable<Order[]> {
    return this.http.get<Order[]>(this.GET_PUBLISHERS);
  }
}
