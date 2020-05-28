import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Publisher} from '../model/publisher';
import {PublisherService} from '../services/publisher.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  publishers: Publisher[] = [];
  constructor(private publisherService: PublisherService) { }

  ngOnInit(): void {
    this.getAllPublishers();
  }

  public getAllPublishers() {
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

}
