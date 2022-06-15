import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { User } from '../user';

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
  constructor(private userService: UserserviceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.getUserByEmailAndPassword(this.email, this.password).subscribe(
      data => {
        this.user = data;
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

