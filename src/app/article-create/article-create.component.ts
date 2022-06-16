import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  url: string = "http://localhost:8080/articles";
  article = {id: 0, marque: "", prix: 0, description: "", categorie: "", imageUrl: ""};
  message: string;
  login: User;
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
      if (this.login.nom != "admin") {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  create() {
    const body = JSON.stringify(this.article);
    this.http.post(this.url, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(
      response => {
        this.message = "article créé";
      },
      err => {
        this.message = "ko";
      }
    );
  }

}
