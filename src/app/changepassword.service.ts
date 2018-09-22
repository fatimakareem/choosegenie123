import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "./Config";
@Injectable()
export class ChangepasswordService {
  private authentication=localStorage.getItem('token');

 
  constructor(private http: Http) { }
  

  changepsd(username,oldpass,pass1,pass2) {
   
    console.log(" service object",username,oldpass,pass1,pass2,this.authentication)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' +  this.authentication.toString());
    return this.http.put(Config.api+'change_password/'+ 'usamaali' 
    +'/' , JSON.stringify({
     
      "currentPassword":oldpass,
      "newPassword":pass1, 
      "newPassword2":pass2
      
    }), 
    {headers: headers}).map((response: Response) => response.json());
    }
  
  }

  



  