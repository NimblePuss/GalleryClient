import { Component, OnInit, group } from '@angular/core';
import {FormGroup, 
        FormControl, 
        FormBuilder,
        Validators,
        ValidatorFn,
        NgForm} from "@angular/forms";
import { NgModel} from '@angular/forms';
import {Observable} from 'rxjs';

import {User} from '../../models/user';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  moduleId: module.id,
  selector: 'app-registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})

export class RegistrationComponent implements OnInit {
  listUsers: User[];
  user: User[];

  fileName: string; //when use method RegisterUser

  filePath = "assets/images/user-icon.png";
  localUrl: any[];

  avatar: any;
  myFormRegistration: FormGroup;

  errors = false;
  errorMessage = '';
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UsersService,
    private alertService: AlertService,
    private route: Router) { 

  }

  formRegistrationErrors = {
    "Name":"",
    "Login": "",
    "Email": "",
    "Password": "",
    "ConfirmPassword":""
  };

  validationMessages = {
    "Name": {
      "required": "Enter your name please",
      "pattern":"Name must be consist only Latin",
      "minlength":"Name must consist of 2 digits and more!"
    },
    "Login": {
      "required": "Enter your Login please",
      "minlength":"Login must consist of 2 digits and more!"
    },
    "Email": {
      "required": "Not correctly entered e-mail!",
      "email":"not the correct format of the entered e-mail!"
    },
    "Password": {
      "required": "Enter your Password please",
      "minlength":"Password must consist of 6 digits and more!",
    }, 
    "ConfirmPassword": {
       "required": "Confirm Password and Confirm password are not equal",
      "minlength":"Confirm Password must consist of 6 digits and more!",
      "isEqualPassword": "Passwords aren't equal"
      
        },   
  };

  onValueChange(data?: any){
    if(!this.myFormRegistration) 
      return;
    let form = this.myFormRegistration;

    for(let field in this.formRegistrationErrors) {
        this.formRegistrationErrors[field] = "";
        let control = form.controls["user"].get(field);

        if(control && control.dirty && !control.valid && control.touched){
          let message = this.validationMessages[field];
          
          for(let key in control.errors){
            this.formRegistrationErrors[field] += message[key] + '\r\n'.toString();
          }
        }
    }
  }

  isEqualPassword(control: FormControl): {[s: string]: boolean}{
    if(!this.myFormRegistration){
      return {isEqualPassword: true};
    }
    let form = this.myFormRegistration;
    let controlForm = form.controls["user"].get('Password');
    if(control.value !== controlForm.value){
    // console.log('controlPassword = ' + controlForm.value + ' ConfirmPassword = ' + control.value);
       return {isEqualPassword: true};
    }
    return null;
 }

  ngOnInit() { 
    this.isEqualPassword = this.isEqualPassword.bind(this);
    this.buildRegistrationForm();
   }

  buildRegistrationForm(){
    
    this.myFormRegistration = this.formBuilder.group({
      "user": this.formBuilder.group({
                  "Name": ['', [Validators.required, 
                                   Validators.pattern(/[A-z]/), 
                                   Validators.minLength(2)]],
                  "Login": ['', [Validators.required, 
                                    Validators.minLength(2)]],
                  "Email": ['', [ Validators.required,
                                  Validators.email]],
                  "PhotoUser": [],
                  "Password": ['', [Validators.required, 
                                    Validators.minLength(6)]],
                  "ConfirmPassword": ['', [Validators.required, 
                                           Validators.minLength(6),
                                           this.isEqualPassword]],   
              })
    });

    this.myFormRegistration.valueChanges.subscribe(data=>this.onValueChange(data));
    this.onValueChange();
  }
 
  onChange(event) {

    // var file = event.srcElement.files[0];  // when use method RegisterUser (on back end)
     //this.fileName = file.name;   // when use method RegisterUser (on back end)

    this.avatar = event.srcElement.files[0];
    this.filePath = event.target.value;
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
           // this.avatar = reader.result;    // when use method RegisterUser (on back end)
            this.localUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }

  }

  onSubmit(form: FormBuilder, file: any){
    file = this.avatar;
    this.loading = true;
    var userReg = this.myFormRegistration.value.user;
    
     userReg.PhotoUserName = this.fileName; // when use method RegisterUser (on back end)
     console.log(this.fileName);  


    this.userService.registerUser(userReg, file).subscribe((data: any) => {
      if(data == "OK"){
        this.myFormRegistration.value.user = {
          Name:"",
          Login:"",
          Email:"",
          PhotoUser: "",   // when use method Register (on back end)
         //PhotoUser: file,   // when use method RegisterUser (on back end)
          Password:"",
          ConfirmPassword:""
        };

          //reset form
        this.myFormRegistration.reset();
        userReg = {
          Name:"",
          Login:"",
          Email:"",
          PhotoUser:"",
          Password:"",
          ConfirmPassword:""
        };
        //redirect login-page
        this.alertService.success("Registration successful", true);
        this.route.navigate(['login']);
      }

      // // when use method RegisterUser (on back end)
      // if(data == "error"){
      //   this.alertService.error("This login is used");
      //        this.loading = false;
      // }
      // if(data =="ups"){
      //   this.alertService.error("Ups... Try again...");
      //       this.loading = false;
      // }

    // when use method Register (on back end)
    },
    error => {
        this.errorMessage = error.message;
        if(error.error["Message"] == "error"){
          this.alertService.error("This login is used");
               this.loading = false;
       } 
       else if(error.status == 500){
        this.alertService.error("Ups... Try again...");
            this.loading = false;
      }

    });
    
  }

}



