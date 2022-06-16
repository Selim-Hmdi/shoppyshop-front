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
      this.restService.findAllArticles();
      let articles: Article[] = JSON.parse(sessionStorage.getItem("articles"));
      for(let i = 0; i < articles.length; i++) {
        let ligne = new Ligne(articles[i], 0);
        this.lignes.push(ligne);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  mngQuantity(ligne){
    ligne.prixLigne = ligne.quantite * ligne.article.prix;
    let prix: number = 0;
    for (ligne of this.lignes) {
      prix += ligne.prixLigne;
    }
    this.prixTotal = prix;
  }

  order() {
    let user: User = JSON.parse(sessionStorage.getItem("user"));
    let commande: Commande = new Commande(user.id);
    for(let ligne of this.lignes) {
      commande.addLigne(ligne);
    }
    console.log(commande);
    this.restService.createCommande(commande);
  }
}
