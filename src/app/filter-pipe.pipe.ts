import { Pipe, PipeTransform } from '@angular/core';
import { Article } from './article';

@Pipe({
  name: 'filter'
})
export class FilterPipePipe implements PipeTransform {
  articles: Array<Article>;
  transform(articles: Array<Article>, searchText: string): Array<Article> {
    if (!articles || !searchText) {
      return articles;
    }

    return articles.filter(article =>
      article.categorie.includes(searchText) || article.description.includes(searchText) || article.marque.includes(searchText));
  }

}
