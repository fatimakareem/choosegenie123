import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "./Config";
@Injectable()
export class CompanyService {



  constructor(private https: Http) {  this.username = localStorage.getItem('title');
}
private authentication=localStorage.getItem('token');
id;
username;
  searchProduct(title,page) {
    console.log(this.username)
   const headers = new Headers();
   headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
   console.log('dashboard', localStorage.getItem('token'));
  //  headers.append('Authorization', 'JWT ' +  localStorage.getItem('token').toString());
    return this.https.get(Config.api + 'mydata/'+ this.username.trim() +'/'+'?page='+page, {headers: headers} ) .map((response: Response)  => response);
    }
    deregulatedsearch(title,page) {
      console.log(this.username)
     let headers = new Headers();
    //  headers.append('Authorization', 'JWT ' +  localStorage.getItem('token').toString());
    headers.append('Authorization', 'JWT ' + localStorage.getItem('token'));
    console.log('deregulatedstate', localStorage.getItem('token'));
      return this.https.get(Config.api + 'titlescompanies/'+ this.username.trim() +'?page='+page, {headers: headers} ) .map((response: Response)  => response);
  
      }
   
}


