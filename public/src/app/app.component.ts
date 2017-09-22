import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users = [];
  
  constructor(private _userService: UserService){

    this._userService.usersObserver.subscribe(
      (users) => this.users = users,
      (err) => console.log(err)
    )
    
  }

}
