import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './pages/login/login.component'
import {RegistrationComponent} from './pages/registration/registration.component'
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AllimagesComponent } from './pages/allimages/allimages.component';


// определение маршрутов
const imageRoutes: Routes = [
    {path: 'myImages', component: AllimagesComponent},
];
export const appRoutes: Routes =[
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'user-list', component: UserListComponent },

    { path: 'home/:id', component: HomeComponent, canActivate: [AuthGuard], children: imageRoutes},
    
   

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);