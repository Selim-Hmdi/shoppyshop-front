export class Article {
  id: number;
  categorie: string;
  marque: string;
  description: string;
  prix: number;
  imageUrl: string;

  constructor(
    id: number,
    categorie: string,
    marque: string,
    description: string,
    prix: number,
    imageUrl: string
  ) {
    this.id = id;
    this.marque = marque;
    this.prix = prix;
    this.description = description;
    this.categorie = categorie;
    this.imageUrl = imageUrl;
  }
}
