import { Component, OnInit } from '@angular/core';
import {Author} from "../model/author";
import {AuthorsService} from "../services/authors.service";
import {Role} from "../model/role.enum";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../model/user";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  currentUser: User;
  constructor(private authorsService: AuthorsService, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
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

  isAdmin() {
    console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN))
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ;
  }
}
