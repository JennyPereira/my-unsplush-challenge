import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImagesService } from 'src/app/services/images.service';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() searchedImages : any;
  @Input() allImages : any;
  @Output() deletedImage = new EventEmitter<any>();

  dataSourceImages!: any;

  constructor( public imagesService: ImagesService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    /*this.imagesService.getImage('5749818').subscribe((res: any) => {
      if (res != null) {
        console.log(res)
      }
    })*/
    /*this.imagesService.getCollection().subscribe( res => {
      this.dataSourceImages = res.media;
    })*/
  }

  deleteImage(informationImg: any) {
    const dialog = this.dialog.open(PhotoModalComponent, {
      data: {
        edit: true,
        info: informationImg
      },
      panelClass: 'custom-modalbox'
    })

    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result != "" ) {
        var indexI = this.searchedImages.findIndex(obj => obj.id == result.id)
        var indexL = this.allImages.findIndex(obj => obj.id == result.id)
        if (indexI > -1) {
          this.searchedImages.splice(indexI, 1)
        }
        if (indexL > -1) {
          this.allImages.splice(indexL, 1)
        }
      }
      
    })

    this.deletedImage.emit(this.searchedImages)
  }

}
