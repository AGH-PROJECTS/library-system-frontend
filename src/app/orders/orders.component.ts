import { Component, OnInit } from '@angular/core';
import {Order} from "../model/order";
import {OrdersService} from "../services/orders.service";
import {Role} from "../model/role.enum";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  columnsToDisplay = ['pesel', 'isbn', 'dateRent', 'dateReturn', 'employee', 'actions'];
  currentUser: User;

  constructor(private ordersService: OrdersService, public authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.isAdmin();
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
    this.columnsToDisplay = this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ? this.columnsToDisplay : this.columnsToDisplay.filter(column => column !== 'actions');
  }

  onEdit(order: Order) {

  }

  onDelete(id: string) {

  }
}
