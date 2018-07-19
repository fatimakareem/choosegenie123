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
  query;
  search;
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
    this.router.navigate(['/dashboard/' + this.username]);
  }
  ngOnInit() {

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
      localStorage.setItem('zip',query);
     this.data.zipcodeInfo(query)
    let sth = 'products/'+query;
    this.router.navigate([sth]);
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
    console.log(localStorage.setItem('zip',zipcode))
    // this.sg['zip'] = Res.json()['Results'];
      this.data.zipcodeInfo(zipcode)
    let sth = 'products/'+zipcode;
    this.router.navigate([sth]);
    // this.data.changezip(this.sg['zip']);
    localStorage.setItem('zip',zipcode);
    console.log(zipcode)
  }
  onKeydown(event) {
  
    if (event.key === "Enter") {

      this.singlerfp(this.zipcode)
      // this.router.navigate(['/products/' + this.zipCode]);
      // localStorage.setItem('zip', this.zipCode);
      console.log(event);

    }
  }
}
