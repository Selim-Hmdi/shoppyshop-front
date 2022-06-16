import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css'],
})
export class CompteComponent implements OnInit {
  login: User;
  message: string;
  errorMessage: string;
  url: string = "http://localhost:8080/users/";
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigate(['']);
    }
  }

  updateUser(id, nom) {
    // modifie le contenu
    const body = JSON.stringify(this.login);
    this.http.put(this.url + id, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(
      response => {
        this.message = "Votre compte a été mis à jour";
      },
      err => {
        this.errorMessage = "ko modification user " + nom.toUpperCase();
      }
    );
  }

}
