import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import {UsersService} from '../services/users/users.service';
import {User} from '../models/user';


@NgModule({
  imports: [NgModule, BrowserModule],
  declarations: [],

})

@Component({
  moduleId: module.id,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],

  providers: [ UsersService ]

})
export class UserListComponent implements OnInit {
  allUsers: User[];

  constructor(private _usersService: UsersService) {
    // this._usersService.getUsers()
    // .subscribe((usersData) =>{ 
    //   console.log(usersData); 
    //     this.allUsers = usersData
    //   });
   }

  ngOnInit() {
    this._usersService.getUsers()
                      .subscribe((usersData) =>{ 
                        console.log(usersData); 
                          this.allUsers = usersData
                        });
  }

  addUser(newUser: User){
    // this.usersService.addUser(newUser);
}

}
