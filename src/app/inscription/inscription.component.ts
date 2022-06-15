import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user: User = new User();
  errorMessage = "";
  userExists: boolean = true;

  constructor(private userService: UserserviceService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") == null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigate(['']);
    }
  }

  saveUser(addForm: NgForm) {
    this.userService.createUser(addForm.value).subscribe(
      data => {
        this.userExists = false;
        let currentUser = JSON.stringify(this.user);
        sessionStorage.setItem("user", currentUser);
        this.goToHomePage();
      }, (error) => {
        if (this.userExists) {
          this.errorMessage = "Un utilisateur existe déjà avec cette adresse email";
          this.user = new User();
        } else {
          this.errorMessage = error;
          this.user = new User();
        }
      });
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  signIn(addForm: NgForm) {
    console.log(this.user);
    this.saveUser(addForm);
  }

}
