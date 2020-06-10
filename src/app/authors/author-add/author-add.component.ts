import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthorsService} from "../../services/authors.service";
import {Author} from "../../model/author";
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authorsService: AuthorsService) {
  }


  ngOnInit(): void {
  }

  saveChanges() {
    const formattedDate =
      formatDate(new Date(this.data.birthday), 'dd.MM.yyyy', 'pl-PL');
    this.authorsService.addAuthor(this.data.firstname, this.data.lastname, formattedDate).subscribe(
      res => console.log(res),
      err => console.log('error')
    )
  }
}
