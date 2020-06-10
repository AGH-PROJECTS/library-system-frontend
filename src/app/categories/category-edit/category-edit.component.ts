import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  private category: Category;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoriesService) { }


  ngOnInit(): void {
  }

  saveChanges() {
    this.category = {id: this.data.id, name: this.data.name};
    this.categoryService.updateCategory(this.category).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    )

  }
}
