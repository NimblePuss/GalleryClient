import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams }  from '@angular/common/http';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from '../../models/user';
import { Route } from '@angular/router';
import {Image} from '../../models/image';
import { ImagesService } from '../images/images.service';


@Injectable()
export class UsersService {
  isLogOut = false;
  private allUsers: User[];
  url: string = "http://localhost:56238";

  constructor(private http: HttpClient,
              private imageService: ImagesService) { }

  getUsers(): Observable<User[]> { 
   return this.http.get<User[]>(this.url + "/api/users",{
     headers: new HttpHeaders({"nameHeader":"Access-Control-Allow-Origin"}),
     observe:"body",
     responseType:"json",
   });
    
  }

  getOneUser(): Observable<User>{
    return this.http.get(this.url + "api/home").map((response: Response) => <User>response.json());
  }

  //when use method Register (on back end)
  registerUser(user: User, file: File){
    let final_data;
    let newfile: File = file;
    let imgs: Image[];

    var formData = new FormData();

    const body: User = {
      Id: user.Id,
      Name: user.Name,
      Login: user.Login,
      Email: user.Email,
      PhotoUser: '',
      Password: user.Password,
      ConfirmPassword: user.ConfirmPassword,
      Images: imgs,
      PhotoUserName: "",
    }
   
    if(!file){
      formData.append(JSON.stringify(body), JSON.stringify(body));
    }
    if(file){
      formData.append('file', newfile);
      formData.append('user', JSON.stringify(body));
    }
  
    var reqHeader = new HttpHeaders({  });
    return this.http.post(this.url + "/api/account/register", formData, {
     headers : reqHeader,
    });
  }
  
  // //when use method RegisterUser (on back end)
  // registerUser(newUser: User, file: any){
  //   var myFile: string = file;
  //  let imgs: Image[];
   
  //   const body: User = {
  //     Id: newUser.Id,
  //     Name: newUser.Name,
  //     Login: newUser.Login,
  //     Email: newUser.Email,
  //     PhotoUser: myFile,
  //     PhotoUserName: newUser.PhotoUserName,
  //     Password: newUser.Password,
  //     ConfirmPassword: newUser.ConfirmPassword,
  //     Images: imgs,
  //   }
  //   console.log(body.PhotoUserName);

  //   var reqHeader = new HttpHeaders({"name":"Access-Control-Allow-Origin"});
  //   reqHeader.append('Content-Type', 'application/json');
  //   reqHeader.append('Content-Type', 'application/json;charset=UTF-8');
  //   reqHeader.append( "Access-Control-Allow-Origin", "*",);

  //  return this.http.post(this.url + "/api/account/registerUser", body, {
  //    headers : reqHeader
  //   });
  // }



  isAuthenticated(){
    if(!this.isLogOut){
        return true;
      }
    if(this.isLogOut)
        return false;
    }
 
    userAuthentication(login, password) {
    this.isLogOut = true;
    var data = "username=" + login + "&password=" + password + "&grant_type=password";

    var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-urlencoded",
                                      "No-Auth":"True" });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }

  getCurrentUserClaims(){
    return this.http.get(this.url+'/api/account/getCurrentUser', {
      headers: new HttpHeaders({"Authorization":"Bearer " + localStorage.getItem("userToken")})
    });
   }
}

