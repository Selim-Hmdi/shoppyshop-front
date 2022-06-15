import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
    private baseURL="http://localhost:8080/users";
    constructor(private httpClient: HttpClient) { }
  
   
    createUser(user: User): Observable<any> {
      return this.httpClient.post(`${this.baseURL}/add`, user).pipe(
        catchError(this.handleError)
      );
    }

    getUserByEmailAndPassword(email: string, password: string): Observable<User> {
      return this.httpClient.get<User>(`${this.baseURL}/user/${email}/${password}`)
    }
  
    getUserByEmail(email: string): Observable<User> {
      return this.httpClient.get<User>(`${this.baseURL}/user/${email}`)
    }
  
    getUserById(id: number): Observable<User>{
      return this.httpClient.get<User>(`${this.baseURL}/${id}`);
    }
  
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went worng.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened: please try again later.'
      );
    }
  
  }

