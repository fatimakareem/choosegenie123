import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from "@angular/router";
import { HomeService } from "../home/home.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../data.service';
import * as _ from 'underscore';
import { PagerService } from '../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';

import swal from 'sweetalert2';
import { error } from 'util';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  pageSizeOptions;
 
  private sub: Subscription;
  private zip: any;
  prod_loaded = false;
  prods_loaded = false;
  localVar;
  public products: any;
  rating;
  closeResult: string;
  stars;
  record: any = [];
  //    setPage;
  constructor(private http: Http, private pagerService: PagerService, private homeService: HomeService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, private router: Router, private dialog: MatDialog, private data: DataService) {

  }

  // array of all items to be paged
  // pager object
  private allItems: any[];
  pager: any = {};
  home: any = {};
  private id: any[];
  page: any[];
  // paged items
  pagedItems: any[];
  public zip_code;
  public username;
  public customer;


  val;
  ngOnInit() {
      this.username = localStorage.getItem('username');
      this.zip_code = localStorage.getItem('zip');
      this.customer = localStorage.getItem('custum')

      // this.fetchitem();
      // this.  fetchitem();
      const Results = {};
      this.val = "methodName($event[0])"
      // onclick = function (rating) {
      //     console.log(rating);
      // }
      this.profile()


      this.data.currentProducts.subscribe(products => this.sg['products'] = products)
      this.data.currentProducts

      this.sub = this.route.params.subscribe(params => {
          this.zip = +params['zipCode'];
          this.setPage(1);


      });




  }
  comtitle='';
  servicearea="";
  cancelation="";
  btnratingClick(id, title, profileurl, profile_logo,servicearea) {
    this.id = id;
    this.comtitle = title;
    this.profileurl = profileurl;
    this.profile_logo = profile_logo;
    this.servicearea=servicearea;
    console.log('id : ' + this.id, this.title);
}
btnderagulateClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_rate, plan_information, rating_logo, profile_logo, profileurl) {
    this.catagoryId = id;

    console.log(this.plan_information)
    this.comtitle = title;
    this.sign_up = sign_up;
    this.phone = phone;
    this.terms_of_service = terms_of_service;
    this.fact_sheet = fact_sheet;
    this.cancelation = cancelation_fee;
    this.price_rate = price_rate
    this.plan_information = plan_information;
    this.rating_logo = rating_logo;

    this.profile_logo = profile_logo;
    this.profileurl = profileurl;

    console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, plan_information, rating_logo, profile_logo, profileurl)
    console.log('id : ' + this.catagoryId);
}
  user;

  checked_login() {
      if (localStorage.getItem('custum')) {
          let local = localStorage.getItem('custum');
          return true;
      }
      // else if(localStorage.getItem('custom')) {
      //     return true;
      // }
      else {
          return false;
      }
  }
  profile() {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'users_profile/' + this.customer + '/', { headers: headers })

          .subscribe(Res => {
              this.data = Res.json();
              console.log(this.data);
              this.user = this.data['user']
          });

  }
  rev: any = [];
  getreview(id) {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'totalreviews/' + id, { headers: headers })

          .subscribe(Res => {
              this.rev = Res.json()['Total Reviews'];

              console.log(this.rev);

          });

  }

  avrage: any = [];
  avereview(id) {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'reviewsperproduct/' + id, { headers: headers })

          .subscribe(Res => {
              this.avrage = Res.json()['Results'];
              console.log(this.avrage);

          });

  }
  rate = '';
  get(rating) {
      this.rate = rating;
  }
  reviews(rate, comt, id) {
      if (localStorage.getItem('custum')) {
      console.log(id)
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
      this.http.post(Config.api + 'reviews/' + this.zip_code + '/' + this.user, JSON.stringify({

          "zipcode": this.zip_code,
          "productid": id,
          "user": this.user,
          "rate": this.rate,
          "comment": comt
      }

      ), { headers: headers })

          // this.http.post(Config.api + 'monthly/' + this.zip_code + '/' + this.months + '',{"month": this.months+" Month","custom":"['2','8']"},{ headers: headers })
          .subscribe(Res => {
              console.log(Res)
              swal({
                  type: 'success',
                  title: 'Rewiew Added Successfully',
                  showConfirmButton: false,
                  timer: 1500

              })
            
          })
         
      }
      else  {
          swal(
              'Invalid',
              'User must login First!',
              'error'
          )
          this.router.navigate(['/userlogin/']);
      }
  }
  catagoryId = '';
  title = '';
  cancelation_fee = '';
  fact_sheet = '';
  phone = '';
  plan_information = '';
  price_rate = '';
  profile_logo = '';
  profileurl = '';
  rating_logo = '';
  sign_up = '';
  terms_of_service = '';

  price_500_kwh = '';
  price_2000_kwh = '';
  //Event Binding of Delete Buttons
  btnEditClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee,price_rate, plan_information, rating_logo, profile_logo, profileurl) {
      this.catagoryId = id;

      console.log(this.plan_information)
      this.title = title;
      this.sign_up = sign_up;
      this.phone = phone;
      this.terms_of_service = terms_of_service;
      this.fact_sheet = fact_sheet;
      this.cancelation_fee = cancelation_fee;
    this.price_rate=price_rate
      this.plan_information = plan_information;
      this.rating_logo = rating_logo;

      this.profile_logo = profile_logo;
      this.profileurl = profileurl;
    
      console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, plan_information, rating_logo, profile_logo, profileurl)
      console.log('id : ' + this.catagoryId);
  }
  items;
  fetchitem(items) {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json')
      this.http.get(Config.api + 'items_perpage/title/asc/' + items, { headers: headers })

          .subscribe(Res => {
              this.sg['products'] = Res.json()['results'];
              this.data.changeProducts(this.sg['products']);
              this.allItems = this.sg['products'];
              for (let prod of this.sg['products']) {
                  console.log(prod["plan_information"])
                  console.log(prod["price_rate"])
                  prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                  prod["price_rate"] = prod["price_rate"].split('..', 3000);
              }
          });

  }
  sortby(sort) {
      if (sort = "Renewable") {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json')
          this.http.get(Config.api + 'sortrenewable/' + this.zip_code, { headers: headers })

              .subscribe(Res => {
                  this.sg['products'] = Res.json()['Results'];
                  this.data.changeProducts(this.sg['products']);
                  this.allItems = this.sg['products'];
                  for (let prod of this.sg['products']) {
                      console.log(prod["plan_information"])
                      console.log(prod["price_rate"])
                      prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                      prod["price_rate"] = prod["price_rate"].split('..', 3000);
                  }
              });
      }
      else if (sort = "Price") {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json')
          this.http.get(Config.api + 'sortprice/' + this.zip_code, { headers: headers })

              .subscribe(Res => {
                  this.sg['products'] = Res.json()['Results'];
                  this.data.changeProducts(this.sg['products']);
                  this.allItems = this.sg['products'];
                  for (let prod of this.sg['products']) {
                      console.log(prod["plan_information"])
                      console.log(prod["price_rate"])
                      prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                      prod["price_rate"] = prod["price_rate"].split('..', 3000);
                  }
              });
      }
      else if (sort = "Company") {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json')
          this.http.get(Config.api + 'sortcompany/' + this.zip_code, { headers: headers })

              .subscribe(Res => {
                  this.sg['products'] = Res.json()['Results'];
                  this.data.changeProducts(this.sg['products']);
                  this.allItems = this.sg['products'];
                  for (let prod of this.sg['products']) {
                      console.log(prod["plan_information"])
                      console.log(prod["price_rate"])
                      prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                      prod["price_rate"] = prod["price_rate"].split('..', 3000);
                  }
              });
      }

  }
  comp = '';
  checked(event, val, i) {
    if (event.target.checked == true) {
        console.log(event.target.checked)
        this.record.push(val)
    }
    else if (event.target.checked == false) {
        console.log(event.target.checked)
        this.record.pop(val)
    }
    console.log(this.record)
}
  Comapreproduct(page:number) {

    console.log(this.record.toString())
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post(Config.api + 'deregulated_compareproducts/', JSON.stringify({

        "productid": this.record.toString()
    }
    ), { headers: headers })
          .subscribe(Res => {
              console.log(Res)
             
              this.deproduct = Res.json()['Results'];
              this.pager = this.pagerService.getPager(Res.json()['Total Result'], page, 10);

          });
  }
state;
zipcodeexist;
  Checkzipcode() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'zipcodecheck/' + this.zip_code, { headers: headers })
        .subscribe(data => {
            console.log(data);
            this.state = data.json()['state'];
            console.log(this.state);
            localStorage.setItem('state', this.state);
            this.zipcodeexist = data.json()['message']
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
                this.router.navigate(['/product/' + this.zip_code]);
                localStorage.setItem('zip', this.zip_code);
              }
              else if(this.state == "notderegulatedstate"){
                this.router.navigate(['/products/' + this.zip_code]);
                localStorage.setItem('zip', this.zip_code);
              }
     
        });
    }
    names;
    months1;
    months2;
    months3;
    months4;
    months5;
    months7;
    months6;
    fixed;
    vari;
    index;
    notprepaid;
    prepaid;
    planmin;
    time;
    nottime;
    renewablerate;
    renewable;
    com;
    item="10";
    price;
    min;
    max;
    min_price_500;
    max_price_500;
    min_price_1000;
    max_price_1000;
    min_price_2000;
    max_price_2000;
    sort;
    checked1(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months1 = "36 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months1;
        }
        console.log(this.months1)
    }
    checked2(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months2 = "24 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months2;
        }
        console.log(this.months2)
    }
    checked3(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months3 = "18 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months3;
        }
        console.log(this.months3)
    }
    // checked4(event, i) {
    //     if (event.target.checked == true) {
    //         console.log(event.target.checked)
    //         this.months4 = "14 Months";
    //     }
    //     else if (event.target.checked == false) {
    //         console.log(event.target.checked)
    //         delete this.months4;
    //     }
    //     console.log(this.months4)
    // }
    checked5(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months5 = "12 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months5;
        }
        console.log(this.months5)
    }
    checked6(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months6 = "6 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months6;
        }
        console.log(this.months6)
    }
    checked18(event, i, item) {
        if (item) {
            console.log(item);
            this.item = item;

        }
        else {
            console.log()
            this.item = "10";

            console.log(this.item)
        }
    }
    checked20(event, i) {
        this.sort = "true";
    }
    checked21(event, i) {
        this.sort = "true";
    }
    checked22(event, i) {
        this.sort = "true";
    }
  deproduct;
  noresult;
  setPage(page: number) {

    
      const Results = {}
if(this.months1 == "36 Months" || this.months2 == "24 Months" || this.months3 == "18 Months" || this.months5 == "12 Months" || this.months6 == "6 Months"|| this.item ||  this.sort){
    this.obj.deregulatedfilter(page, this.zip_code,this.months1,this.months2, this.months3,this.months5, this.months6,this.item,this.sort).subscribe(response => {

        this.deproduct = response['Results'];
this.noresult=response['Total Result'];
    
        this.pager = this.pagerService.getPager(response['Total Result'], page, 10);

    }


    );


}
    else{  this.obj.searchProducts1(this.zip_code, page).subscribe(response => {
       
          this.deproduct = response['Results'];

      // this.data.changeProducts(this.sg['products']);
       
       
          this.pager = this.pagerService.getPager(response['Total Result'], page, 10);

      }


      );


  
    }
  }
}
