import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category";
import {CategoriesService} from "../services/categories.service";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {Role} from "../model/role.enum";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  currentUser: User;
  constructor(private categoriesService: CategoriesService, public authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.categoriesService.getAllCategories().subscribe(
      res=>{
        this.categories = res;
      },
      err=>{
        console.log(err);
        alert("Error with get categories")
      }
    )
  }

  isAdmin() {
    console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN))
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ;
  }
}
