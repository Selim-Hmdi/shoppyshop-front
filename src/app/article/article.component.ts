import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles: Array<Article>;
  searchText: any;
  url: string = "http://localhost:8080/articles/";
  unique: Array<any>;
  message: string;
  id: number;
  login: User;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
      if (this.login.nom == "admin") {
        // récupération de l'id
        this.route.params.subscribe(
          params => {
            this.id = params['id'];
          }
        );
        this.init();
        for (let article of this.articles.values()) {
          this.unique = Array.from(new Set(article.categorie));
          console.log(this.unique);
        }
      } else {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  init() {
    // ajouter le type de la classe après le get
    this.http.get<Array<Article>>(this.url).subscribe(
      response => {
        this.articles = response;
      },
      err => {
        this.message = "ko affichage";
      }
    );
  }

  update(id) {
    this.route.queryParams.subscribe(params => {
      id = params['id'];
    });
    this.router.navigate(['/update', id]);
  }

  deleteArticle(id, marque, description) {
    let c = confirm("Etes-vous sûr de vouloir supprimer l'article " + marque.toUpperCase() + " " + description)
    if (c) {
      this.http.delete(this.url + id).subscribe(
        response => {
          this.message = "article " + marque.toUpperCase() + " " + description + " supprimé";
          this.init();
        },
        err => {
          this.message = "ko suppression";
        }
      );
    } else {
      this.message = "Annulation suppression article " + marque.toUpperCase();
    }
  }

}
