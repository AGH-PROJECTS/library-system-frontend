import {Component, Inject, OnInit} from '@angular/core';
import {Publisher} from "../../model/publisher";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PublisherService} from "../../services/publisher.service";

@Component({
  selector: 'app-publisher-add',
  templateUrl: './publisher-add.component.html',
  styleUrls: ['./publisher-add.component.css']
})
export class PublisherAddComponent implements OnInit {
  private publisher: Publisher;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private publisherService: PublisherService) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.publisherService.addPublisher(this.data.name).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    )

  }
}
