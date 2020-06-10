import {Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {Author} from "../model/author";
import {AuthorsService} from "../services/authors.service";
import {Role} from "../model/role.enum";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";
import { MatTableModule } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {AuthorEditComponent} from "./author-edit/author-edit.component";
import {AuthorAddComponent} from "./author-add/author-add.component";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  columnsToDisplay = ['firstName', 'lastName', 'dateOfBirth', 'actions'];
  currentUser: User;
  constructor(private authorsService: AuthorsService, public authenticationService: AuthenticationService, public dialog: MatDialog) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.isAdmin();
    this.getAllAuthors();
  }

  private getAllAuthors() {
    this.authorsService.getAllAuthors().subscribe(
      res=> {
        this.authors = res;
      },
      err=>{
        console.log(err);
        alert("Error with get authors");
      }
    )
  }

  onDelete(id: string) {
    this.authorsService.deleteAuthor(id).subscribe(
      result => this.refresh(),
      err => console.error(err)
    );

  }

  isAdmin() {
    //console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN));
    this.columnsToDisplay = this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ? this.columnsToDisplay : this.columnsToDisplay.filter(column => column !== 'actions');
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN);
  }

  onEdit(author: Author) {
    this.dialog.open(AuthorEditComponent, {
      data: {
        author_id: author.id,
        author_firstname: author.firstName,
        author_lastname: author.lastName,
        author_birthday: author.dateOfBirth
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  refresh() {
    this.authorsService.getAllAuthors().subscribe(
      res=> {
        this.authors = res;
      },
      err=>{
        console.log(err);
        alert("Error with get authors");
      }
    )
  }


  onAdd() {
    this.dialog.open(AuthorAddComponent, {
      data: {
        firstname: null,
        lastname: null,
        birthday: null
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }
}
