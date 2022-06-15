import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorie: string;
  articles: Array<Article>;
  searchText: any;
  constructor(private router : Router) {  }

  ngOnInit(): void {
  }

  logout() {
    sessionStorage.removeItem("user");
    this.router.navigate(['']);
  }
}
