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
  isAdmin: boolean = false;
  constructor(private router: Router) {  }


  ngOnInit(): void {
    this.isLoggedIn();
  }

  logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    this.isLoggedin = false;
    this.isAdmin = false;
    this.router.navigate(['']);
  }

  isLoggedIn() {
    if (sessionStorage.getItem("user") != null) {
      this.isLoggedin = true;
      if(sessionStorage.getItem("admin") != null) {
        this.isAdmin = true;
      }
    } else {
      this.isLoggedin = false;
      this.isAdmin = false;
    }
  }
}
