import { Injectable } from '@angular/core';
import {User} from '../model/User';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserManagementService {
  activeUser: User;
  constructor(private authService: AuthService) { }

  getActiveUser(): Observable<User> {
    return this.authService.user;
  }

}
