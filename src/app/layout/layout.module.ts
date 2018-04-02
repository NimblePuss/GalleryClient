import { Routes, RouterModule, NavigationExtras} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component'

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent],

    exports: [
        HeaderComponent,
        FooterComponent],
        
    imports: [ 
        RouterModule,
        BrowserModule, 
        ReactiveFormsModule,
        FormsModule, 
        HttpModule,
        RouterModule
    ],
    providers: []
  })

export class LayoutModule{ }