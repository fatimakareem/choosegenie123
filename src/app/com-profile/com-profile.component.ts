import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
 import swal from 'sweetalert2'; 
import { MatSelect } from '@angular/material'; 
import { ProfileService } from './profile.service';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-com-profile',
  templateUrl: './com-profile.component.html',
  styleUrls: ['./com-profile.component.scss']
})
export class ComProfileComponent implements OnInit { 
public username;
data:any=[];
private authentication

  constructor(private serve:ProfileService,private https:Http,public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { 
     this.authentication=JSON.parse(localStorage.getItem('currentUser'));
      console.log("token",this.authentication)

  }

  ngOnInit() { this.username = localStorage.getItem('username');
  // this.gettoken = JSON.parse(localStorage.getItem('currentUser'));
  this.profile();
  console.log(this.username)
  this. fetchProducts();
  }
  fetchProducts() {
       
    let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' +  this.authentication.token);

    
    this.https.get(Config.api +'mydata/'+ this.username +'/' ,{ headers: headers })
    .subscribe(Res => {
    this.sg['products'] = Res.json()['Results'];
    
    });
    
    } 
  profile() {
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT ' +  this.authentication);

    this.https.get(Config.api + 'comprofile/' + this.username + '/', { headers: headers })
    
    .subscribe(Res => {
    this.data=Res.json();
    console.log(this.data);
    });
    
    }
    onRegister(updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser) {
      console.log('edit' +updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser);
      this.serve.updata( updatedid,updatedREP,updatedREPid,updatedName,updatedphone,updatedmarket,updatedstatus,updateduser).subscribe(data => {
          console.log(data);
          swal({
              type: 'success',
              title: 'Successfully updated',
              showConfirmButton: false,
              timer: 1500
            })
            this.profile();

      }, error => {
      });
  }

}
