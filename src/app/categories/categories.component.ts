import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category";
import {CategoriesService} from "../services/categories.service";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {Role} from "../model/role.enum";
import {MatDialog} from "@angular/material/dialog";
import {CategoryEditComponent} from "./category-edit/category-edit.component";
import {AuthorAddComponent} from "../authors/author-add/author-add.component";
import {CategoryAddComponent} from "./category-add/category-add.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  columnsToDisplay = ['name', 'actions'];
  currentUser: User;
  constructor( public dialog: MatDialog, private categoriesService: CategoriesService, public authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    this.isAdmin();
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
    this.columnsToDisplay = this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ? this.columnsToDisplay : this.columnsToDisplay.filter(column => column !== 'actions');
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN);
  }

  onEdit(category: Category) {
    this.dialog.open(CategoryEditComponent, {
      data: {
        id: category.id,
        name:category.name
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  onDelete(id: string) {
    this.categoriesService.deleteCategory(id).subscribe(
      result => this.refresh(),
      err => console.error(err)
    );
  }

  refresh() {
    this.categoriesService.getAllCategories().subscribe(
      res=> {
        this.categories = res;
      },
      err=>{
        console.log(err);
        alert("Error with get categories");
      }
    )
  }

  onAdd() {
    this.dialog.open(CategoryAddComponent, {
      data: {
        name: null,
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }
}
