import { Component, OnInit } from '@angular/core';
import { ImagesService } from './services/images.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-unplash-app';
  imagesArray: string[] = [];
  imagesList: string[] = [];
  dataSourceImages!: any;
  test: any;

  constructor( public imagesService: ImagesService ) {
    this.imagesService.getCollection().subscribe( res => {
      this.imagesArray = res.media;
      this.imagesList = res.media.reverse();
      this.test = res.media;
    })
  }

  updateImagesView(imagesSearched) {
    this.imagesArray = imagesSearched;
  }

  deletedPhoto(photoDeleted){
    this.imagesArray = photoDeleted;
  }

  addPhoto(photoAdded: any){
    this.imagesArray = photoAdded.reverse();
  }
}
