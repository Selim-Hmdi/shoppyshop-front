import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categorie: string;
  articles: Array<Article>;
  users: Array<User>;
  searchText: any;
  user: User;
  isLoggedin: boolean = false;
  constructor(private router: Router) {  }


  ngOnInit(): void {
    this.isLoggedIn();
  }

  logout() {
    sessionStorage.removeItem("user");
    this.isLoggedin = false;
    this.router.navigate(['']);
  }

  isLoggedIn() {
    if (localStorage.getItem("user") != null) {
      this.isLoggedin = true;
      return this.isLoggedin;
    } else {
      return this.isLoggedin = false;
    }
  }
}
