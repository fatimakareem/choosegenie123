import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "./Config";
@Injectable()
export class CompanyService {



  constructor(private https: Http) {  this.username = localStorage.getItem('username');
}
private authentication=localStorage.getItem('token');
id;
username;
  searchProduct(title,page) {
    console.log(this.username)
   const headers = new Headers();
   headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
   console.log('dashboard', localStorage.getItem('token'));
  //  headers.append('Authorization', 'JWT ' +  localStorage.getItem('token').toString());
    return this.https.get(Config.api + 'mydata/'+ this.username +'/'+'?page='+page, {headers: headers} ) .map((response: Response)  => response);
    }
    deregulatedsearch(title,page) {
      console.log(this.username)
     let headers = new Headers();
    //  headers.append('Authorization', 'JWT ' +  localStorage.getItem('token').toString());
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log('user_profile', localStorage.getItem('token'));
      return this.https.get(Config.api + 'titlescompanies/'+ this.username +'?page='+page, {headers: headers} ) .map((response: Response)  => response);
  
      }
   
}


