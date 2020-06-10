import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthorsService} from "../../services/authors.service";
import {Author} from "../../model/author";

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {
  private author: Author;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authorsService: AuthorsService) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.author = {id: this.data.author_id, firstName: this.data.author_firstname, lastName: this.data.author_lastname, dateOfBirth: this.data.author_birthday};
    this.authorsService.updateAuthor(this.author).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    )

  }

}
