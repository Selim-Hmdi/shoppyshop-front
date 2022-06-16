import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  email: string;
  password: string;
  errorMessage = "";
  user: any;
  login: User;
  constructor(private userService: UserserviceService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") == null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.userService.getUserByEmailAndPassword(this.email, this.password).subscribe(
      data => {
        this.user = data;
        let currentUser = JSON.stringify(this.user);
        sessionStorage.setItem("user", currentUser);
        console.log(this.user);
        this.goToHomePage();
      }, (error) => {
        if (this.user == null) {
          this.errorMessage = "Utilisateur introuvable. L'email ou le mot de passe entré est inexistant ou incorrect";
        } else {
          this.errorMessage = error;
        }
      });
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

}

