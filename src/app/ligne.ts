import { Article } from "./article";

export class Ligne {
    article: Article;
    quantite: number;

    constructor(article: Article, quantite: number) {
        this.article = article;
        this.quantite = quantite;
    }
}
