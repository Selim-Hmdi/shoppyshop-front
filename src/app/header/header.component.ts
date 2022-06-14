import { Component, OnInit } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorie: string;
  articles: Array<Article>;
  searchText: any;
  constructor() {  }

  ngOnInit(): void {
  }

  logout() {

  }
}
