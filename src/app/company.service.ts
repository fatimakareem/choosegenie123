import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "./Config";
@Injectable()
export class CompanyService {



  constructor(private https: Http) {  this.username = localStorage.getItem('username');
}
id;
username;
  searchProduct(title,page) {
    console.log(this.username)
   let headers = new Headers();
    return this.https.get(Config.api + 'mydata/'+ this.username +'/'+'?page='+page, {headers: headers} ) .map((response: Response)  => response);
    }
    deregulatedsearch(title,page) {
      console.log(this.username)
     let headers = new Headers();
      return this.https.get(Config.api + 'titlescompanies/'+ this.username +'?page='+page, {headers: headers} ) .map((response: Response)  => response);
  
      }
   
}


