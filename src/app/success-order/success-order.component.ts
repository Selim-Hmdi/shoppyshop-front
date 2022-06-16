import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {
  login: User;
  constructor(private router: Router) {
   }

  ngOnInit(): void {
    if (sessionStorage.getItem("user") != null) {
      this.login = JSON.parse(sessionStorage.getItem("user"));
    } else {
      this.router.navigate(['']);
    }
  }

}
