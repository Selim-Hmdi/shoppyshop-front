import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http/http';
import { Article } from '../article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Array<Article>;
  url: string = "http://localhost:8080/articles/";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Array<Article>>(this.url).subscribe(response => {
      this.articles = response;
    }, err => {
      console.log("ko server");
    });
  }

}
