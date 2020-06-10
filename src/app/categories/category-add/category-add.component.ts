import {Component, Inject, OnInit} from '@angular/core';
import {Category} from "../../model/category";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {
  private category: Category;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoriesService) { }


  ngOnInit(): void {
  }

  saveChanges() {
    this.categoryService.addAuthor(this.data.name).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    )

  }
}
