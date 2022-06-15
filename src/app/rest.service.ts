import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commande } from './commande';

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

  createCommande(commande: Commande) {
    const body = JSON.stringify(commande);
    const url = "http://localhost:8080/commandes/add/" + commande.userId;
    this.http.post(url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(
      response => {
        console.log("POST request success");
        sessionStorage.removeItem("panier");             
      },

      failure => {
        console.error("Failed POST request at : " + url);
        console.error(failure); 
      }
    )
  }
}
