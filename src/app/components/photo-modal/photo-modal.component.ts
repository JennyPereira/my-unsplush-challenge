import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Photo } from 'src/app/models/photo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  edition!: boolean;
  description: string;
  photoObj: Photo[];

  photoForm = new FormGroup({
    photo_lbl: new FormControl(null, Validators.required),
    photo_id: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$")]),
    objPhoto: new FormControl(null)
  });

  constructor( 
    public imagesService: ImagesService,
    public dialogRef: MatDialogRef<PhotoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit(): void {
    if (this.data != null) {
      if (this.data.edit == true) {
        this.edition = this.data.edit;
        this.description = this.data.info.alt;
        this.photoObj = this.data.info;
      } else {
      }
      
    }
  }

  addPhoto() {
    this.photoForm.get('photo_lbl')?.value;
    var pi = this.photoForm.get('photo_id')?.value;
    this.imagesService.getImage(pi).subscribe((res: any) => {
      if (res != null) {
        this.photoForm.get('objPhoto')?.setValue(res)
        this.dialogRef.close(this.photoForm.value);
      }
    })

    /*setTimeout(() => {
      this.dialogRef.close(this.photoForm);
    }, 500);*/
  }

  deleteOption() {
    this.dialogRef.close(this.photoObj);
  }

}

