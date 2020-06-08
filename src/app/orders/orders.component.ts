import { Component, OnInit } from '@angular/core';
import {Author} from "../model/author";
import {AuthorsService} from "../services/authors.service";
import {Order} from "../model/order";
import {OrdersService} from "../services/orders.service";
import {Role} from "../model/role.enum";
import {User} from "../model/user";
import {CategoriesService} from "../services/categories.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentUser: User;

  constructor(private ordersService: OrdersService, public authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  private getAllOrders() {
    this.ordersService.getAllOrders().subscribe(
      res=> {
        this.orders = res;
      },
      err=>{
        console.log(err);
        alert("Error with get orders");
      }
    )
  }

  isAdmin() {
    console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN))
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ;
  }
}
