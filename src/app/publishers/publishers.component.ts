import { Component, OnInit } from '@angular/core';
import {Publisher} from '../model/publisher';
import {PublisherService} from '../services/publisher.service';
import {Role} from "../model/role.enum";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {
  publishers: Publisher[] = [];
  currentUser: User;
  constructor(private publisherService: PublisherService, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x)
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks() {
    this.publisherService.getAllPublishers().subscribe(
      res => {
        this.publishers = res;
      },
      err => {
        console.log(err);
        alert("Error with get books");
      }
    )
  }

  isAdmin() {
    console.log(this.currentUser && this.currentUser.roles.includes(Role.ADMIN))
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ;
  }
}
