import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { SimpleGlobal } from 'ng2-simple-global';
import { ResponseContentType } from '@angular/http/src/enums';
import { FormBuilder, Validators, NgControl, RadioControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import swal from 'sweetalert2';
import { MatSelect } from '@angular/material';
import { LoginService } from '../pages/login/login.service';
import { ViewChild } from '@angular/core';
import { RecaptchaComponent } from 'recaptcha-blackgeeks';
import { HeaderService } from './header.service';
import { DataService } from '../data.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public customer;
  public username;
  model: any = {};
  public massage;
  state;
  query;
  search;
  zipcodeexist;
  zipcode;
  record: any = []
  zipCode;
  constructor(private router: Router, private _serv: HeaderService,  private data: DataService, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  checked_login() {
    if (localStorage.getItem('custum')) {
      let local = localStorage.getItem('custum');
      return true;
    }
    else {
      return false;
    }
  }
  check_login() {
    if (localStorage.getItem('user')) {
      let local = localStorage.getItem('user');
      return true;
    }
    else {
      return false;
    }
  }
  move() {
    this.router.navigate(['/consumerdashboard/']);
  }
  moving() {
    if(localStorage.getItem('massage') == "Successfully Login As Not Deregulatedstate vendor"){
      this.router.navigate(['/dashboard/' + this.username]);}
      else if(localStorage.getItem('massage') == "Successfully Login As Deregulatedstate vendor"){
          this.router.navigate(['/dashboards/' + this.username]);
      }
  }
  ngOnInit() {
    this.massage = localStorage.getItem('massage')
    const mainSearch = $('.main-search');
    const formSearch = $('.form-search');

    $('#searchIcon').click(function () {
      $(mainSearch).addClass('active');
      $('body').addClass('noScroll');
      $(formSearch).addClass('flipInX');

      setTimeout(function () {
        $('.form-search .mat-input-element').focus();
      }, 370);

    });

    $('#closeSearch').click(function () {
      $(mainSearch).removeClass('active');
      $('body').removeClass('noScroll');
      $(formSearch).removeClass('flipInX');
    });

    this.username = localStorage.getItem('user')
    console.log(this.username);
    this.customer = localStorage.getItem('custum')
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);

  }
  submit(event,query){
    if (event.key == "Enter") {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'zipcodecheck/' + query, { headers: headers })
        .subscribe(data => {
          console.log(data);
          console.log(data['message'], 'hhhhhhhhhhhhhhh')
  this.state=data['state'];
          this.zipcodeexist = data['message']
          if (this.zipcodeexist == "InValid Zipcode") {
            swal({
              text: "InValid Zipcode",
              title: "Choice Genie",
              type: "error",
              showConfirmButton: false,
              timer: 1200,
              confirmButtonText: "OK",
  
            })
          }
          else if (this.state == "deregulatedstate") {
            this.router.navigate(['/product/' + query]);
            localStorage.setItem('zip', query);
          }
          else if(this.state == "notderegulatedstate"){
            this.router.navigate(['/products/' + query]);
            localStorage.setItem('zip', query);
          }
        },
          error => {
            console.log(error);
  
  
          });
  //  window.location.reload()
 

  }}
  searchuserdata(query) {
    console.log(query)
    this._serv.searchrecord(query).subscribe(data => {
      this.record = data
    
      // this.sg['zip'] = Res.json()['Results'];
      // this.data.changezip(this.sg['zip']);
      console.log(this.record)
    }, error => {

    })
   
  }
  
  singlerfp(zipcode){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + zipcode, { headers: headers })
      .subscribe(data => {
        console.log(data);
        console.log(data['message'], 'hhhhhhhhhhhhhhh')
this.state=data['state'];
        this.zipcodeexist = data['message']
        if (this.zipcodeexist == "InValid Zipcode") {
          swal({
            text: "InValid Zipcode",
            title: "Choice Genie",
            type: "error",
            showConfirmButton: false,
            timer: 1200,
            confirmButtonText: "OK",

          })
        }
        else if (this.state == "deregulatedstate") {
          this.router.navigate(['/product/' + zipcode]);
          localStorage.setItem('zip', zipcode);
        }
        else if(this.state == "notderegulatedstate"){
          this.router.navigate(['/products/' + zipcode]);
          localStorage.setItem('zip', zipcode);
        }
      },
        error => {
          console.log(error);


        });
  }
 
  
}
