import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, retry, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private endpoint = environment.URL_API;
  photo: any[] = []; 

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'KaX8HXm1vdI7E8TjSBiAuUrbPwvxJY1f35nqHg1GibGZsHNj66OktfCe'
    })
  };

  constructor( private http: HttpClient ) { }

  getImage(idImage: any) {
    return this.http.get<any>(`https://api.pexels.com/v1/photos/${idImage}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }//5749818

  getCollection() {
    return this.http.get<any>(`https://api.pexels.com/v1/collections/cucinhk`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(() => {
      window.alert(errorMessage)
      return errorMessage;
    });
  }
}
