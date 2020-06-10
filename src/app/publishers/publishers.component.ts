import { Component, OnInit } from '@angular/core';
import {Publisher} from '../model/publisher';
import {PublisherService} from '../services/publisher.service';
import {Role} from "../model/role.enum";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {CategoryEditComponent} from "../categories/category-edit/category-edit.component";
import {PublisherEditComponent} from "./publisher-edit/publisher-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {CategoryAddComponent} from "../categories/category-add/category-add.component";
import {PublisherAddComponent} from "./publisher-add/publisher-add.component";

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {
  publishers: Publisher[] = [];
  columnsToDisplay = ['name', 'actions'];
  currentUser: User;
  constructor(public dialog: MatDialog, private publisherService: PublisherService, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x=> this.currentUser = x)
  }

  ngOnInit(): void {
    this.isAdmin();
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
    this.columnsToDisplay = this.currentUser && this.currentUser.roles.includes(Role.ADMIN) ? this.columnsToDisplay : this.columnsToDisplay.filter(column => column !== 'actions');
    return this.currentUser && this.currentUser.roles.includes(Role.ADMIN);
  }

  onEdit(publisher: Publisher) {
    this.dialog.open(PublisherEditComponent, {
      data: {
        id: publisher.id,
        name:publisher.name
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  onDelete(id: string) {
    this.publisherService.deletePublisher(id).subscribe(
      result => this.refresh(),
      err => console.error(err)
    );
  }

  refresh() {
    this.publisherService.getAllPublishers().subscribe(
      res=> {
        this.publishers = res;
      },
      err=>{
        console.log(err);
        alert("Error with get publishers");
      }
    )
  }

  onAdd() {
    this.dialog.open(PublisherAddComponent, {
      data: {
        name: null,
      }
    }).afterClosed().subscribe(() => {
      this.refresh();
    })
  }
}
