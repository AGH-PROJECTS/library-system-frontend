import { Component, OnInit } from '@angular/core';
import {Publisher} from '../model/publisher';
import {PublisherService} from '../services/publisher.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css']
})
export class PublishersComponent implements OnInit {

  publishers: Publisher[] = [];
  constructor(private publisherService: PublisherService) { }

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
}
