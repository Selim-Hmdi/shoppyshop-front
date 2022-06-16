import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Array<Article>;
  searchText: any;
  url: string = "http://localhost:8080/articles/";
  unique: Array<any>;
  constructor(private http: HttpClient, private router: Router) { 
    this.articles = new Array<Article>();
  }

  ngOnInit(): void {
    this.http.get<Array<Article>>(this.url).subscribe(response => {
      this.articles = response;
    }, err => {
      console.log("ko server");
    });
    for (let article of this.articles.values()) {
      this.unique = Array.from(new Set(article.categorie));
      console.log(this.unique);
    }
  }

}
