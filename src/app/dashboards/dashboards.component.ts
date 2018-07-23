import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../Config";
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from "../company.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { Pipe, PipeTransform } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { HomeService } from "../home/home.service";
import { PagerService } from '../pager.service';
import { ResponseContentType } from '@angular/http/src/enums';
import { Console } from '@angular/core/src/console';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
import { ActivatedRoute, Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { PageEvent } from '@angular/material';
import { DeleteService } from '../dashboard/delete.service';
import { EditService } from '../dashboard/edit.service';
import { DataService } from '../data.service';

import { NgForm, FormBuilder, FormGroup, Validators, FormControl, AbstractControl, FormGroupDirective, RadioControlValueAccessor } from '@angular/forms';
import swal from 'sweetalert2';
import { NgControl } from '@angular/forms';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }


}

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private https: HttpClient, private newService: DeleteService, private serve: EditService,
    private formBuilder: FormBuilder, private router: Router, private http: Http, private pagerService: PagerService, private homeService: HomeService, private sg: SimpleGlobal, private dialog: MatDialog, private dataa: DataService, private companyService: CompanyService) {

    this.title = localStorage.getItem('username');

  }
  date;
  mydate;
  today = Date.now();
  // mydate;
  publishdate;
  Inactivedate;
  pageSizeOptions;
  private allItems: any[];
  pager: any = {};
  home: any = {};
  id: number;
  page: any[];
  pagedItems: any[];
  private sub: Subscription;
  private zip: any;
  prod_loaded = false;
  prods_loaded = false;
  localVar;
  public products: any;
  rating;
  closeResult: string;
  public username;
  name;
  obj: any = [];
  editdata: any = [];
  states;
  companystates() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api + 'deregulated_utility/', { headers: headers })

      .subscribe(Res => {

        this.states = Res.json();


        console.log(this.states)
      });

  }
  search() {
    this.title = localStorage.getItem('username');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //   this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    this.http.post(Config.api + 'vedor_product_search/' + this.title, JSON.stringify({
      "productinactive": this.Inactivedate,
      "propublish": this.publishdate,
      "state": this.name
    }), { headers: headers }).subscribe(Res => {
      console.log(Res);

      this.sg['products'] = Res.json()['Results'];
     
      this.allItems = this.sg['products'];
    });
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  setPage(title, page: number) {

    this.title = localStorage.getItem('username');
    console.log("usernameeeeeeeeeeeee", this.title)

    const Results = {};

    this.companyService.searchProduct1(title, page).subscribe(Response => {
      console.log('service');
      this.sg['products'] = Response.json()['Results'];

      console.log(this.sg['products']);

      this.prod_loaded = true;
      this.prods_loaded = true;
      this.allItems = this.sg['products'];
      console.log(Response.json()['Total Result']);
      this.pager = this.pagerService.getPager(Response.json()['Total Result'], page, 10);
    });
  }

  catagoryId = '';
  title = '';
  comtitle = '';
  cancelation = '';
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
  price_1000_kwh = '';
  price_500_kwh = '';
  price_2000_kwh = '';
  //Event Binding of Delete Buttons
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
  btnshowClick(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11) {
    this.catagoryId = id;
    console.log(this.plan_information)
    this.title = val1;
    this.sign_up = val2;
    this.phone = val3;
    this.terms_of_service = val4;
    this.plan_information = val8;
    this.fact_sheet = val5;
    this.cancelation_fee = val6;
    this.price_1000_kwh = val7;
    this.price_500_kwh = val12;

    this.price_2000_kwh = val13;

    this.rating_logo = val9;
    this.profile_logo = val10;
    this.profileurl = val11;

    console.log(val1, val2, val3, val4, val5, val6, val7, val8, val9, val10, val11)
    console.log('id : ' + this.catagoryId);
  }
  data;
  dataId = '';
  list = 'Hello';
  status: boolean = false;
  //Event Binding of Delete Buttons
  btnDeleteClick(id) {
    this.dataId = id;
    console.log('id : ' + this.dataId);
  }

  //Event Binding of PopUp Delete Modal

  deleteClick(id) {
    console.log('delete' + id);

    //Calling Delete Service
    this.newService.DeleteTodoList(id).subscribe(data => {
      console.log(data);
      swal({
        type: 'success',
        title: 'Successfully deleted',
        showConfirmButton: false,
        timer: 1500
      })

      this.setPage(this.title, 1)


    }, error => {
    });


  }
  btnEditClick(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11) {
    this.catagoryId = id;
    console.log(this.plan_information)
    this.title = val1;
    this.sign_up = val2;
    this.phone = val3;
    this.terms_of_service = val4;
    this.plan_information = val8;
    this.fact_sheet = val5;
    this.cancelation_fee = val6;
    this.price_1000_kwh = val7;
    this.price_500_kwh = val12;
    this.price_2000_kwh = val13;
    this.rating_logo = val9;
    this.profile_logo = val10;
    this.profileurl = val11;

    console.log(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11)
    console.log('id : ' + this.catagoryId);
  }

  //Event Binding of PopUp Delete Modal

  editClick(mydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive) {
    console.log('edit' + updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    console.log("TS OBJECT", updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    //Calling Delete Service
    this.serve.editTodoList(mydate, updateddate, this.catagoryId, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive).subscribe(data => {
      console.log(data);
      swal({
        type: 'success',
        title: 'Successfully updated',
        showConfirmButton: false,
        timer: 1500
      })

      this.setPage(this.title, 1);
    }, error => {
    });
  }
  btnactiveClick(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11) {

    this.catagoryId = id;
    console.log(this.plan_information)
    this.title = val1;
    this.sign_up = val2;
    this.phone = val3;
    this.terms_of_service = val4;
    this.plan_information = val8;
    this.fact_sheet = val5;
    this.cancelation_fee = val6;
    this.price_1000_kwh = val7;
    this.price_500_kwh = val12;
    this.status = false;
    this.price_2000_kwh = val13;

    this.rating_logo = val9;
    this.profile_logo = val10;
    this.profileurl = val11;

    console.log(id, val1, val2, val3, val4, val5, val6, val12, val13, val7, val8, val9, val10, val11)
    console.log('id : ' + this.catagoryId);
  }

  //Event Binding of PopUp Delete Modal

  activeClick(updatedmydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive) {
    console.log('edit' + updatedmydate, updateddate, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    console.log("TS OBJECT", updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, upactive);
    //Calling Delete Service
    this.serve.editTodoList(updatedmydate, updateddate, this.catagoryId, updatedtitle, updatedsign_up, updatedphone, updatedterms_of_service, updatedfact_sheet, updatedcancelation_fee, updatedprice500kwh, updatedprice1000kwh, updatedprice2000kwh, updatedplan_information, updatedrating_logo, updatedprofile_logo, updatedprofileurl, false).subscribe(data => {
      console.log(data);
      swal({
        type: 'success',
        title: 'Successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
      this.setPage(this.title, 1);

    }, error => {
    });

  }

  private Sub: Subscription;
  form;
  updataForm: FormGroup;
  public ngOnInit() {
    this.title = localStorage.getItem('username')
    console.log(this.title, 'gggggggggggggggg')
    this.updataForm = this.formBuilder.group({

      cancelation_fee: ['', Validators.compose([Validators.required])],
      fact_sheet: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      id: ['', Validators.required],
      plan_information: ['', Validators.compose([Validators.required])],
      price_rate: ['', Validators.compose([Validators.required])],
      profile_logo: ['', Validators.compose([Validators.required])],
      profileurl: ['', Validators.required],
      rating_logo: ['', Validators.compose([Validators.required])],
      sign_up: ['', Validators.compose([Validators.required])],
      terms_of_service: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
    });
    this.setPage(this.title, 1)
    console.log(this.title, 1)
    this.companystates();

  }
  ngAfterViewInit() {
    const breakCards = true;
    if (breakCards === true) {
      $('[data-header-animation="true"]').each(function () {
        const $fix_button = $(this);
        const $card = $(this).parent('.card');
        $card.find('.fix-broken-card').click(function () {
          const $header = $(this).parent().parent().siblings('.card-header, .card-image');
          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(function () {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(function () {
          const $this = $(this);
          const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr('data-count', hover_count);
          if (hover_count >= 20) {
            $(this).children('.card-header, .card-image').addClass('hinge animated');
          }
        });
      });
    }
  }

}
