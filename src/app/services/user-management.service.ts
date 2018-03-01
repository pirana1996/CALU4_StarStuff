import { Injectable } from '@angular/core';
import {AuthService} from '../core/auth.service';
import {User} from '../model/User';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserManagementService {
  activeUser: User;
  constructor(private authService: AuthService) { }

  getActiveUser(): Observable<User> {
    return this.authService.user;
  }

}
