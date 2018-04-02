import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent {
  public userForm;
  isLoginError: boolean = false;
  constructor(private fb: FormBuilder,
              private _alertService: AlertService,
              private route: Router,
              private _usersService: UsersService) {
    this.createForm();
    
  }

  createForm() {

    this.userForm = this.fb.group({
      login: ['', Validators.compose([Validators.required, Validators.minLength(3)]) ],
      password: ['', Validators.required ]
    });
  }

  onSubmit() {
    var userCurrent = this.userForm.value;
    console.log(userCurrent);
    this._usersService.userAuthentication(userCurrent.login, userCurrent.password)
                          .subscribe((data: any) =>{
                            localStorage.setItem('userToken', data.access_token);
                            this._usersService.isLogOut = false;
                            this.route.navigate(['home'],{ queryParams: { id: userCurrent.Id }});
                          }, 
                          (err: HttpErrorResponse) =>{ 
                            this.isLoginError = true;
                            if(err.status == 401){
                              this._alertService.error("Username or password is incorrect! Register, please!");
                              this.isLoginError = false;
                              this.route.navigate(['register']);
                           } 
                            if(err.status == 500){
                              this._alertService.error("Register, please!");
                              this.isLoginError = true;
                              this.route.navigate(['register']);
                           } 
                          });
  
  }

  

}



