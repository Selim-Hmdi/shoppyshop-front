import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  findAllArticles() {
    const url = 'http://localhost:8080/articles';
    this.http.get(url).subscribe(
      (successResponse) => {
        sessionStorage.setItem('articles', JSON.stringify(successResponse));
      },
      (failureResponse) => {
        console.error('Failed GET request at : ' + url);
        console.error(failureResponse);
      }
    );
  }
}
