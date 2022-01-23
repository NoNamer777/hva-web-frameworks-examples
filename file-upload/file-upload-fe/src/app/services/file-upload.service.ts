import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // Pointing to the back-end endpoint
  url = 'http://localhost:8080/rest/upload';

  constructor(private http: HttpClient) { }

  uploadWithProgress(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData, { observe: 'events',  reportProgress: true })
      .pipe(
        catchError(err => this.handleError(err))
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
