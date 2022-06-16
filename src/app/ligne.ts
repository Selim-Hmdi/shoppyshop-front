import { Article } from './article';

export class Ligne {
  article: Article;
  quantite: number;
  prixLigne: number;

  constructor(article?: Article, quantite?: number) {
      this.article = article;
      this.quantite = quantite;
      this.prixLigne = this.quantite * this.article.prix;
  }
}

