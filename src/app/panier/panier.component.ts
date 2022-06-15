import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Article } from '../article';
import { Commande } from '../commande';
import { Ligne } from '../ligne';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',

  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  user: string;
  lignes: Ligne[];
  prixTotal: number = 0;

  constructor(private restService: RestService, private router: Router) {
    this.lignes = new Array<Ligne>();
  }

  ngOnInit(): void {
    this.restService.findAllArticles();
    let articles: Article[] = JSON.parse(sessionStorage.getItem("articles"));
    console.log(sessionStorage.getItem("articles"));
    for(let i = 0; i < articles.length; i++) {
      this.lignes.push(new Ligne(articles[i], i+1));
    }
  }

  order() {
    let commande = new Commande(0, "", 1);

    for(let ligne of this.lignes) {
      commande.addLigne(ligne);
    }
    
    this.restService.createCommande(commande);
  }
}
