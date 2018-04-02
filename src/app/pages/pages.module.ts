import {Routes, RouterModule, NavigationExtras} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AlertService } from '../services/alert/alert.service';

import { AlertComponent } from './alert/alert.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AllimagesComponent } from './allimages/allimages.component';

// const RECIPE_ROUTES: Routes = [
//     { path:'home', component: HomeComponent, canActivate: [AuthGuard], children: [
//         {path: 'myImages', component: AllimagesComponent,},

//     ]},
// ]

// export const pagesRouting = RouterModule.forChild(RECIPE_ROUTES);

@NgModule({
    declarations: [
        AlertComponent,
        RegistrationComponent,
        LoginComponent,
        HomeComponent,
        AllimagesComponent
    ],
    exports: [
        AlertComponent,
        RegistrationComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [ 
        RouterModule,
        BrowserModule, 
        ReactiveFormsModule,
        FormsModule, 
        HttpModule,
        // pagesRouting
    ],
    providers: [
        AlertService,
        AuthGuard
    ]
  })

export class PagesModule{ }