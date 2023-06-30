import { TestBed } from '@angular/core/testing';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ImagesService } from './images.service';
import { Photo } from '../models/photo';
import { of, throwError, defer } from 'rxjs';

export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }

describe('ImagesService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let imageService: ImagesService;
    let expectedImages: Photo;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ ImagesService ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        imageService = TestBed.inject(ImagesService);
        expectedImages = <Photo>
            {
                id: 2,
                width: 3024,
                height: 3024,
                url: "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
                photographer: "Joey Farina",
                photographer_url: "https://www.pexels.com/@joey",
                photographer_id: 680589,
                avg_color: "#978E82",
                src: {
                    original: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
                    large2x: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    large: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    medium: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
                    small: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
                    portrait: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                    landscape: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                    tiny: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                },
                liked: false,
                alt: "Brown Rocks During Golden Hour"
            }
        
    })

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('should return expected heroes (called once)', () => {
        imageService.getCollection().subscribe({
            next: photos => expect(photos)
                .withContext('should return expected photos')
                .toEqual(expectedImages)
        })

        const req = httpTestingController.expectOne('https://api.pexels.com/v1/collections/cucinhk');
        expect(req.request.method).toEqual('GET');

        req.flush(expectedImages)
    });

    it('should return an error when the server returns a 404', () => {
        const msg = 'Error Code: 404'
        imageService.getCollection().subscribe({
            next: photo => fail('excepted to fail'),
            error: (error) => {
                expect(error.error).toContain('404 error');
            }
        });

        const req = httpTestingController.expectOne('https://api.pexels.com/v1/collections/cucinhk')
        
        req.flush('404 error', { status: 404, statusText: 'Not Found' });
        
    })

});

describe('ImagesService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let imageService: ImagesService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        imageService = new ImagesService(httpClientSpy as any);
    })

    it('should return expected photo (HttpClient called once)', (done: DoneFn) => {
        let expectedImages = <Photo>
            {
                id: 2,
                width: 3024,
                height: 3024,
                url: "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
                photographer: "Joey Farina",
                photographer_url: "https://www.pexels.com/@joey",
                photographer_id: 680589,
                avg_color: "#978E82",
                src: {
                    original: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
                    large2x: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                    large: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
                    medium: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
                    small: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
                    portrait: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
                    landscape: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
                    tiny: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
                },
                liked: false,
                alt: "Brown Rocks During Golden Hour"
            }

        httpClientSpy.get.and.returnValue(of(expectedImages));

        imageService.getImage(2).subscribe({
            next: photo => {
                expect(photo)
                .withContext('expected photo')
                .toEqual(expectedImages)
                done()
            }
        });
    });

    it('should return an error when the server returns a 404', (done: DoneFn) => {
        const errorResponse = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found'
        })

        httpClientSpy.get.and.returnValue(asyncError(errorResponse));

        imageService.getImage(0).subscribe({
            next: photo => done.fail('expected an error, not photos'),
            error: (error: HttpErrorResponse) => {
                expect(error).toContain('Error Code: 404');
                done();
            }
        })
    });
})
