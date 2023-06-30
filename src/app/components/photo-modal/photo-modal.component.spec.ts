import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { PhotoModalComponent } from './photo-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ImagesService } from 'src/app/services/images.service';
import { HttpClientModule } from '@angular/common/http';

describe('PhotoModalComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoModalComponent ],
      imports: [
        MatDialogModule,
        HttpClientModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        PhotoModalComponent,
        { provide: ImagesService },
      ]
    });
    
  });

  it ('should recieve data when open the dialog', async () => {
    let comp = TestBed.inject(PhotoModalComponent);
    comp.ngOnInit();
    let imageService = TestBed.inject(ImagesService);
    expect(comp.description).toBeUndefined;
  });


  it ('should send form when close dialog', async () => {
    let comp = TestBed.inject(PhotoModalComponent);
    let imageService = TestBed.inject(ImagesService);
    expect(comp.description).toBeUndefined;
  });
});
