import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {CategoriesService} from "../../services/categories.service";
import {PublisherService} from "../../services/publisher.service";
import {Publisher} from "../../model/publisher";

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {
  private publisher: Publisher;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private publisherService: PublisherService) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.publisher = {id: this.data.id, name: this.data.name};
    this.publisherService.updatePublisher(this.publisher).subscribe(
      res=>console.log(res),
      err=>console.log('error')
    )

  }
}
