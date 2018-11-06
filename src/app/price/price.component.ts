import { Component, OnInit } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { PricingService} from './pricing.service';
import swal from 'sweetalert2';
import { Router} from '@angular/router';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  /////////////////////////////card///////////////////////////
  public mask = [/\d/, /\d/, /\d/, /\d/];
  public mask1 = [/[a-zA-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/,
    /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/, /[a-z A-Z]/];
  cardnumber1;
  cardnumber2;
  cardnumber3;
  cardnumber4;
  cardholdername;
  expmonth;
  expyear;
  ccv;
  flipclass = 'credit-card-box';
  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step1class = 'active';
  step2class = '';
  step3class = '';
  authcode = '';
  fullname = '';
  pass = '';
  retypepass = '';
  passnotequal = false;
  email;
  pricepackage = [];
  user_id;
  payment_result;
  showresponse = false;
  loading = false;
  emailconfirmerror = false;
  other = false;
  free = false;
  pkg_detail={};
  pkgsub = false;
  info = false;
  card = false;
  pkg;
  local;
  uname;
  /////////////////////////////end///////////////////////////
  
    constructor( private _nav:Router,private _serv: PricingService,private http: Http) {}
      //
      next_stepdetail(event: any){
          if (event.target.value == "BM") {
              this.prv_stepdetail("B", "M")
  
          } else if (event.target.value == "PY") {
              this.prv_stepdetail("P", "Y")
          }
  
      }
  firststep(value){
        console.log(value)
      if (value == "BM") {
          this.prv_stepdetail("B", "M")
  
      } else if (value == "PY") {
          this.prv_stepdetail("P", "Y")
      }
  }
  
      prv_stepdetail(type,dur) {
          this.pkg_detail['type']=type
          this.pkg_detail['dur']=dur
          this.pkgsub = true;
  
      }
  
  ////////////////////////////////////Card Module//////////////////////////////////
  
  proceedstep1() {
    this.loading = true;
  }
  
  flip() {
    this.flipclass = 'credit-card-box hover';
  }
  
  flipagain() {
    this.flipclass = 'credit-card-box';
  }
  
  
  pay() {
    if (this.free) {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          email: this.email, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), {headers: headers})
        .map((response: Response) => {
  
        });
    } else {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('http://ns519750.ip-158-69-23.net:8100/cr/',
        JSON.stringify({
          creditno: this.cardnumber1 + this.cardnumber2 +
          this.cardnumber3 + this.cardnumber4, exp: this.expmonth + '/' + this.expyear,
          ccv: this.ccv, name: this.cardholdername,
          id: this.user_id, pricepackage: this.pricepackage[0],
          duration: this.pricepackage[1]
        }), {headers: headers})
        .map((response: Response) => {
  
          this.payment_result = response.json();
          console.log(this.payment_result);
        });
    }
  }
  
  proceed() {
    this.pkg_detail['credit']=this.cardnumber1 + this.cardnumber2 +
    this.cardnumber3 + this.cardnumber4
    this.pkg_detail['ccv']=this.ccv
    this.pkg_detail['expdate']= this.expmonth + '/' + this.expyear
    this.local = localStorage.getItem('currentUser');
    let pars = JSON.parse(this.local) ;
    this.uname = pars.username
    this._serv.package_free(this.uname,this.pkg_detail).subscribe(
      data =>{
             
              swal(
                'Your payment has been transferred',
                '',
                'success'
              )
              let url = 'find-bids';
              this._nav.navigate([url]);
               
      },
      error => {
              // console.log(error);
              swal(
                'Oops...',
                'Something went wrong!',
                'error'
              )
      });
   
  }
  gotocreditcard() {
    this.emailconfirmerror = false;
    this.checkcode(this.authcode)
      .subscribe(
        data => {
          this.step1 = false;
          this.step2 = true;
          this.step1class = '';
          this.step2class = 'active';
  
        },
        error => {
          console.log(error);
          console.log(error);
          this.emailconfirmerror = true;
        });
  }
  
  checkcode(key) {
    console.log(key);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/verify/email/',
      JSON.stringify({
        email: this.email,
        key: key
      }), {headers: headers})
      .map((response: Response) => {
  
      });
  }
  
  saveaccountdetail() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://ns519750.ip-158-69-23.net:8100/create/account/',
      JSON.stringify({
        email: this.email,
        name: this.fullname,
        password: this.pass
      }), {headers: headers})
      .map((response: Response) => {
        console.log(response);
        this.user_id = response.json().user_id;
        console.log(this.user_id);
      });
  }
  
  // step 2 done
  gotocheckout() {
    if (this.pass === this.retypepass) {
      if (this.free) {
        this.proceed();
        this.saveaccountdetail()
          .subscribe(
            data => {},
            error => {
              // this.loading = false;
            });
      } else {
        this.saveaccountdetail()
          .subscribe(
            data => {
              this.passnotequal = false;
              this.step2 = false;
              this.step3 = true;
              this.step2class = '';
              this.step3class = 'active';
              console.log('Account details submitted', true);
            },
            error => {
              // this.loading = false;
            });
      }
  
    } else {
      this.passnotequal = true;
    }
  }
  
  chkpass() {
    if (this.pass === this.retypepass) {
      this.passnotequal = false;
    }
  }
  
  ///////////////////////////////////END//////////////////////////////////////////
  check_login() {
    if (localStorage.getItem('currentUser')) {
      this.local = localStorage.getItem('currentUser');
     let pars = JSON.parse(this.local) ;
     this.uname = pars.username
    
      return false
    }
    else {
      return true
    }
  }
    ngOnInit() {
    
    }
  
  
  }
  