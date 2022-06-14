import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categorie: string;
  articles: Array<Article>;
  url: string = "http://localhost:8080/articles/";
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.categorie = params['categorie'];
    });

    this.http.get<Array<Article>>(this.url + "article/" + this.categorie).subscribe(response => {
        this.articles = response;
    }, err => {
      // créer page "erreur articles"
      console.log("ko server");
    });
  }

}
