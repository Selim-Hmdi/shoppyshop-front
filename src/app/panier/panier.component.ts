import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Article } from '../article';
import { Commande } from '../commande';
import { Ligne } from '../ligne';
import { RestService } from '../rest.service';
import { User } from '../user';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',

  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  user: string;
  lignes: Ligne[];
  prixTotal: number = 0;
  login: User;
  constructor(private restService: RestService, private router: Router) {
    this.lignes = new Array<Ligne>();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigate(['']);
    }
    this.restService.findAllArticles();
    let articles: Article[] = JSON.parse(sessionStorage.getItem("articles"));
    console.log(sessionStorage.getItem("articles"));
    for(let i = 0; i < articles.length; i++) {
      this.lignes.push(new Ligne(articles[i], i+1));
    }
  }

  order() {
    if(!sessionStorage.getItem("user")) {
      this.router.navigate(["/inscription"]);
      return;
    }

    let user: User = JSON.parse(sessionStorage.getItem("user"));
    let commande: Commande = new Commande(user.id);
    for(let ligne of this.lignes) {
      commande.addLigne(ligne);
    }
    console.log(commande);
    this.restService.createCommande(commande);
  }
}
