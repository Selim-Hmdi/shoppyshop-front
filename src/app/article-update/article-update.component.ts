import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {
  article: any;
  errorMessage: string;
  id: any;
  url: string = "http://localhost:8080/articles/";
  login: User;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
      if (this.login.nom == "admin") {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.http.get(this.url + this.id).subscribe(response => {
            this.article = response;
          }, err => {
            console.log("ko " + err);
          });
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  updateArticle(marque, id) {
    // modifie le contenu
    const body = JSON.stringify(this.article);
    this.http.put(this.url + id, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(
      response => {
        this.article = response;
        this.router.navigate(['/article']);
      },
      err => {
        console.log(err);
        console.log(this.article);
        this.errorMessage = "ko modification article " + marque;
      }
    );
  }

}
