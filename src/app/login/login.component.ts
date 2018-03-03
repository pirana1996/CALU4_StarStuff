import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticated: Object;
  user: User;

  constructor(public auth: AuthService,  private router: Router) {
    this.auth.user.subscribe(user => {
      this.user = user;
      if (user)
        this.router.navigate(['/posts/list']);
    });
  }

  ngOnInit() {

  }

}
