import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  filterImages: any[] = [];
  myControl = new FormControl('');
  filterText = '';
  photoModel: Photo;
  

  @Input() searchedImages : any;
  @Output() searchImg = new EventEmitter<any>();
  @Output() addPhoto = new EventEmitter<any>();

  constructor( 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  addNewPhoto() {
    const dialogRef = this.dialog.open(PhotoModalComponent, {
      data: {
        edit: false,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "" ) {
        var findPhoto = this.img_NoRepeat(result.objPhoto.id)
        if ( findPhoto == false ) {
          this.photoModel = result.objPhoto;
          this.photoModel.type = 'Photo';
          this.photoModel.alt = result.photo_lbl;
          this.searchedImages.reverse().push(this.photoModel)
          
          this.addPhoto.emit(this.searchedImages);
        } else {
          this._snackBar.open("Repeated photo", "OK", {
            duration: 3000, 
            horizontalPosition: 'center', 
            verticalPosition: 'top',
            panelClass: ['custom-snkb'],
          })
        }
        
      }
      
    })

  }


  public img_NoRepeat(idSearched: any){
    var findImg: Boolean = false;
    var result = this.searchedImages.find(({id}) => id === idSearched)
    if ( result !== undefined ){
      findImg = true;
    }
    return findImg;
  }

  /*private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.photosArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  public filterResults() {
    if (this.filterText == '') {
      this.filterImages = this.searchedImages;
    }
    this.filterImages = this.searchedImages.filter(
      photo => photo?.alt.toLowerCase().includes(this.filterText.toLowerCase())
    );

    this.searchImg.emit(this.filterImages)
  }

  public onValueChanged() {
    this.filteredOptions  = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    )
  }*/

}
