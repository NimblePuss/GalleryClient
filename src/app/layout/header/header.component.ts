import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isLogOut: boolean;
  constructor(private router: Router,
              private _userService: UsersService) { }

  ngOnInit() {
    if(localStorage.getItem('userToken') == null){
      this._userService.isLogOut =true ;
    }
    else{
      this._userService.isLogOut =false ;
    }
  }
  isAuth(){
    return this._userService.isAuthenticated();
  }
  Logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['login']);
    this._userService.isLogOut = true;
    this.isLogOut = this._userService.isLogOut;
  }
}
