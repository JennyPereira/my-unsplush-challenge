import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PhotoModalComponent } from '../photo-modal/photo-modal.component';
import { of } from 'rxjs';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        TopbarComponent
      ],
      imports: [
        MatSnackBarModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents();
            
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('the image does not repeat', () => {
    const photosArray = [
       { id: 2244566, alt: 'testing'},
       { id: 4452887, alt: 'testing'},
      ]
    component.searchedImages = photosArray;
    let funcINR = component.img_NoRepeat(2244566);

    expect(funcINR).toEqual(true);
  });

  it('should open dialog', async() => {
    const responseMock = {
          photo_lbl: 'test',
          objPhoto: {
            id: 125,
            "width": 3024,
            "height": 3024,
            "photographer_id": 680589,
            "avg_color": "#978E82"
          }
        };
    const photosArray = [
      { id: 2244566, alt: 'testing'},
      { id: 4452887, alt: 'testing'},
      ]
    component.searchedImages = photosArray;
    let openDialogSpy = spyOn(component.dialog, 'open')
    .and
    .returnValue({ afterClosed: () => of(responseMock)
    } as MatDialogRef<typeof component>);
    const fakeData = {data: { edit: false }};

    component.addNewPhoto();
    fixture.detectChanges();

    expect(openDialogSpy).toHaveBeenCalledWith(PhotoModalComponent, fakeData);
  });

});
