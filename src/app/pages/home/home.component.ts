import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import { UsersService } from '../../services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  isLogOut: boolean;
  userClaim: any = null;
  isLoginError: boolean = false;

  user: User;
 
  private routeSubscription: Subscription;

  constructor(private _userService: UsersService,
              private _router:Router,
              private _activateRoute: ActivatedRoute,
              private _alertService: AlertService) {
    // this.routeSubscription = _activateRoute.params.subscribe(params=>this.user.Id=params['Id']);
    }

  ngOnInit() {
    this._userService.getCurrentUserClaims().subscribe((data: any) =>{
      if(data != null){
        this.userClaim = data;
        console.log(this.userClaim);
      }
      else{
        this._alertService.error("Ups...server error", false);
        this._router.navigate(["login"]);
      }
    },
    (err: HttpErrorResponse) =>{ 
      this.isLoginError = true;
      if(err.status == 401){
        this._alertService.error("Username or password is incorrect! Register, please!");
        this.isLoginError = true;
        localStorage.removeItem('userToken');
        this._userService.isLogOut = true;
        this.isLogOut = this._userService.isLogOut;
        this.userClaim = null;
        
        this._router.navigate(['register']);
     } 
      if(err.status == 500){
        this._alertService.error("Register, please!");
        this.isLoginError = true;
        localStorage.removeItem('userToken');
        this._userService.isLogOut = true;
        this.isLogOut = this._userService.isLogOut;
        this.userClaim = null;

        this._router.navigate(['register']);
     } 
    });
  }

}
