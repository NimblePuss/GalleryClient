import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpModule, Http } from '@angular/http';
import {Routes, RouterModule} from '@angular/router';


import { LayoutModule } from './layout/layout.module'
import { AppComponent } from './app.component';
import {PagesModule} from './pages/pages.module';

import {UsersService} from './services/users/users.service';

import { Component } from '@angular/core';

import { routing } from './app.routing';

import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './services/alert/alert.service';
import { AuthGuard } from './guards/auth/auth.guard';
import { ImagesService } from './services/images/images.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
  ],
  imports: [
    RouterModule,
    PagesModule,
    LayoutModule,
    routing,
    CommonModule,
    HttpModule,
    HttpClientModule 
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
  providers:[
    UsersService, 
    AlertService,
    AuthGuard,
    ImagesService
  ]
})
export class AppModule { }
