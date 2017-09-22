import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  users = [];
  usersObserver = new BehaviorSubject([]);

  constructor(private _http: Http) {
    this._http.get('/users')
    .subscribe(
      (users) => {
        this.users = users.json(); 
        this.usersObserver.next(this.users);
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
