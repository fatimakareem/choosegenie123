// IMPORTANT: this is a plugin which requires jQuery for initialisation and data manipulation
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Config } from "../../Config";
import { Subscription } from 'rxjs/Subscription';
import { HomeService } from "../../home/home.service";
import { ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators, FormGroupDirective } from "@angular/forms";
import { SimpleGlobal } from 'ng2-simple-global';
import { DataService } from '../../data.service';
import * as _ from 'underscore';
import { PagerService } from '../../pager.service';
import { Pipe, PipeTransform } from "@angular/core";
// import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http, Response } from '@angular/http';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

// import {Config} from "../Config";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { jsonpCallbackContext } from '@angular/common/http/src/module';
// import { ValueUnwrapper } from '@angular/core/src/change_detection/change_detection_util';
//import { Http } from '@angular/http/src/http';
import { PageEvent } from '@angular/material';
// import { SSL_OP_NO_TICKET } from 'constants';

import swal from 'sweetalert2';
import { error } from 'util';



declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

// declare var $;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }


}

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css']

})

export class ProductsComponent implements OnInit, AfterViewInit {
    today = Date.now();
    
    date;
    deragulate;
    energy;
    i;
    name;
    pager: any = {};
    pageSizeOptions;
    public dataTable: DataTable;
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
    market;
    zipcodeexist;
    //    setPage;
    constructor(private http: Http, private pagerService: PagerService, private homeService: HomeService, private route: ActivatedRoute, public sg: SimpleGlobal, private obj: HomeService, public router: Router, private dialog: MatDialog, private data: DataService) {

    }

    // array of all items to be paged
    // pager object
    private allItems: any[];

    home: any = {};
    private id: any[];
    page: any[];
    // paged items
    pagedItems: any[];
    public zip_code;
    public username;
    public customer;


    val;
    state;
    ngOnInit() {
        console.log(this.today = Date.now())

       this.state = localStorage.getItem('state')
        console.log(this.state)
        this.username = localStorage.getItem('username');
        this.zip_code = localStorage.getItem('zip');
        this.customer = localStorage.getItem('custum')
        console.log(localStorage.getItem('zip'), 'kkkkkkkkkk')
        // this.fetchitem();
        // this.  fetchitem();
        const Results = {};
        this.val = "methodName($event[0])"
        // onclick = function (rating) {
        //     console.log(rating);
        // }

        this.companytitle();



    }
    btnDeleteClick(id, title, profileurl, profile_logo,servicearea) {
        this.id = id;
        this.comtitle = title.trim();
        this.profileurl = profileurl;
        this.profile_logo = profile_logo;
        this.servicearea=servicearea;
        console.log('id : ' + this.id, this.title);
    }
   
    user;

    checked_login() {
        if (localStorage.getItem('custum')) {
            let local = localStorage.getItem('custum');
            return true;
        }
      
        else {
            return false;
        }
    }
    profile() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'user_profile/' + this.customer + '/', { headers: headers })

            .subscribe(Res => {
                this.data = Res.json();
                console.log(this.data);
                this.user = this.data['user'].id;
                console.log(this.user)
            });

    }
    rev: any = [];
   
  
    submit(id, title) {
        console.log(title.trim())
        this.router.navigate(['/Review/' + id]);
        //userprofile
        localStorage.setItem('company', title.trim());
    }
    comtitle;
    rate = '';
    title = '';
    get(rating) {
        this.rate = rating;

    }
    reviews(rate, comt, id) {
        console.log(this.servicearea)
        
        console.log(this.title);
        if (localStorage.getItem('custum')) {
            console.log(id)
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.post(Config.api + 'reviews/' + this.comtitle, JSON.stringify({
                "rate": this.rate,
                "company_name": this.comtitle,
                "comment": comt,
                "user": this.user,
                "servicearea":this.servicearea,
                "profile":this.profile_logo
            }

            ), { headers: headers })
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
        else {
            swal(
                'Invalid',
                'User must login First!',
                'error'
            )
            this.router.navigate(['/userlogin/']);
        }
    }
    catagoryId = '';

    cancelation = '';
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
    servicearea="";
    //Event Binding of Delete Buttons
   
    btnEditClick(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl) {
        this.catagoryId = id;

        console.log(this.plan_information)
        this.comtitle = title;
        this.sign_up = sign_up;
        this.phone = phone;
        this.terms_of_service = terms_of_service;
        this.fact_sheet = fact_sheet;
        this.cancelation = cancelation_fee;
        this.price_1000_kwh = price_1000_kwh;
        this.plan_information = plan_information;
        this.rating_logo = rating_logo;

        this.profile_logo = profile_logo;
        this.profileurl = profileurl;
        this.price_500_kwh = price_500_kwh;
        this.price_2000_kwh = price_2000_kwh;
        console.log(id, title, sign_up, phone, terms_of_service, fact_sheet, cancelation_fee, price_1000_kwh, price_500_kwh, price_2000_kwh, plan_information, rating_logo, profile_logo, profileurl)
        console.log('id : ' + this.catagoryId);
    }
    items;
   
   
    Items: any = [];
    featuredplan() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json')
        this.http.get(Config.api + 'topproducts/', { headers: headers })

            .subscribe(Res => {

                this.sg['plan'] = Res.json()['Results'];
                // this.data.changeProducts(this.sg['plan']);
                this.Items = this.sg['plan'];
                for (let prod of this.sg['plan']) {
                    console.log(prod["plan_information"])
                    console.log(prod["price_rate"])
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);
                }
                setTimeout(function () {
                    $('.autoplay').slick({
                        autoplay: true,
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        prevArrow: '<button class="slick-arrow leftArrow btn-slider btn-slider-left" style="left:0;"><i class="fa fa-angle-left"></i></button>',
                        nextArrow: '<button class="slick-arrow rightArrow btn-slider btn-slider-right" style="right:0;"><i class="fa fa-angle-right"></i></button>'
                    });
                }, 50);
            });
    }



    hits(event) {
        if (event.target.checked == true) {

            let headers = new HttpHeaders();


            headers.append('Content-Type', 'text/html');

            this.http.get(Config.api + 'postcounts/' + this.record.toString() + '/')



                .subscribe(data => {
                    console.log(data);




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
        this.http.post(Config.api + 'comparisonproducts/', JSON.stringify({

            "productid": this.record.toString()
        }
        ), { headers: headers })

            .subscribe(response => {
                console.log(response)
              
                this.product = response.json()['Results'];

                for (let prod of this.product) {
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);

                }
                this.pager = this.pagerService.getPager(response.json()['Total Result'], page, 10);
            }, error => {

            })
    }



    ngAfterViewInit() {
        this.profile()
        this.featuredplan()

        this.data.currentProducts.subscribe(products => this.sg['products'] = products)
        this.data.currentProducts

        this.sub = this.route.params.subscribe(params => {
            this.zip = +params['zipCode'];
            this.setPage(1);


        });

        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[10, 25, 50, -1], [10, 25, 50, 'All']],
            responsive: true,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search records',
            }


        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function () {
            const $tr = $(this).closest('tr');

            const data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
        });

        // Delete a record
        table.on('click', '.remove', function (e: any) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        // Like record
        table.on('click', '.like', function () {
            alert('You clicked on Like button');
        });

    }
    companytitle() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get(Config.api + 'companytitle/', { headers: headers })

            .subscribe(Res => {

                this.title = Res.json();

                this.title = this.title;
                console.log(this.title)
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
    modal: any = [];
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
    checked4(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months4 = "14 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months4;
        }
        console.log(this.months4)
    }
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
    checked7(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.months7 = "5 Months";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.months7;
        }
        console.log(this.months7)
    }
    checked8(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.fixed = "Fixed Rate";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.fixed;
        }
        console.log(this.fixed)
    }
    checked9(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.vari = "Variable (Changing Rate)";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.vari;
        }
        console.log(this.vari)
    }
    checked10(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked, this.market)
            this.market = "Indexed (Market Rate)";
        }
        else if (event.target.checked == false) {
            console.log(event.target.checked)
            delete this.market;
        }
        console.log(this.market)
    }
    checked11(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked)
            this.notprepaid = "prepaid";
            delete this.prepaid;
            console.log(this.notprepaid);
        }

        console.log(this.notprepaid)
    }
    checked12(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.prepaid = "prepaid";
            delete this.notprepaid;
        }

        console.log(this.prepaid)
    }
    checkedpre(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            delete this.notprepaid;
            delete this.prepaid;

        }

        console.log(this.prepaid, this.notprepaid)
    }
    checked13(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.planmin = "NULL";

        }

        console.log(this.planmin)
    }
    checkedall(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            delete this.planmin;

        }

        console.log(this.planmin)
    }
    checked14(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.time = "Time Of Use";
            delete this.nottime;
        }

        console.log(this.time)
    }
    checkedtime(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            delete this.time;
            delete this.nottime;
        }
        console.log(this.time)
    }
    checked15(event, i) {
        if (event.target.checked == true) {
            console.log(event.target.checked);
            this.nottime = "Time Of Use";
            delete this.time;
        }

        console.log(this.nottime)
    }
    checked16(event, i, energy) {
        if (energy) {
            console.log(energy);
            this.renewable = energy;

        }
        else if (!energy) {
            console.log()
            delete this.renewable;
        }
        console.log(this.renewable)
    }
    checked17(event, i, name) {
        if (name) {
            console.log(name);
            this.names = name.trim();
            console.log(this.name)
        }
        else {
            console.log()
            delete this.names;
        }
        console.log(this.names)
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
    pricerate(min, max, price) {
        this.min = min;
        this.max = max;
        this.price = price;


        console.log()
    }

    checked20(event, i) {
        this.sort = "dsc";
    }
    checked21(event, i) {
        this.sort = "dsc";
    }
    checked22(event, i) {
        this.sort = "dsc";
    }
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
                    localStorage.setItem('zip', this.zip_code)
                    //  window.location.reload();
                  }
                  else if(this.state == "notderegulatedstate"){
                
                    this.router.navigate(['/products/' + this.zip_code]);
                    delete this.names;
                    localStorage.setItem('zip', this.zip_code);
                    // window.location.reload()
                  }
         
            });
        }
        product;
        noresult;
    setPage(page: number) {
    
        const Results = {}
        if (this.months1 == "36 Months" || this.months2 == "24 Months" || this.months3 == "18 Months" || this.months4 == "14 Months" || this.months5 == "12 Months" || this.months6 == "6 Months" || this.months7 == "5 Months" || this.fixed == "Fixed Rate" || this.vari == "Variable (Changing Rate)" || this.market == "Indexed (Market Rate)" || this.notprepaid == "Prepaid" || this.prepaid == "Prepaid" || this.planmin == "NULL" || this.time == "Time Of Use" || this.nottime == "Time Of Use" || this.renewable || this.names || this.sort == "dsc" || this.item || this.price) {

            console.log(this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7, this.fixed, this.vari, this.market, this.prepaid, this.notprepaid, this.planmin, this.time, this.nottime, this.renewable, this.names, this.price, this.sort, this.price, 'tttttttttttt');
            this.obj.filter(page, this.zip_code, this.months1, this.months2, this.months3, this.months4, this.months5, this.months6, this.months7, this.fixed, this.vari, this.market, this.notprepaid, this.prepaid, this.planmin, this.time, this.nottime, this.renewable, this.names, this.price, this.sort, this.item, this.min, this.max).subscribe(response => {

                this.product = response['Results'];
this.noresult=response['Total Result'];
                for (let prod of this.product) {
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);

                }
             
                this.pager = this.pagerService.getPager(response['Total Result'], page, 10);

            }


            );


        }
       
       
        else{
            this.obj.searchProducts(this.zip_code, page).subscribe(response => {

                this.product = response['Results'];
                this.noresult=response['Total Result'];
                for (let prod of this.product) {
                    prod["plan_information"] = prod["plan_information"].split(',,', 3000);
                    prod["price_rate"] = prod["price_rate"].split('..', 3000);

                }
              
               
                this.pager = this.pagerService.getPager(response['Total Result'], page, 10);

            }


            );
      
        }

      
    }
  

    openDialog(pID): void {
                let dialogRef = this.dialog.open(PremiseDialog, {
                    // width: '300px',
                    data: { productID: pID, zip: this.zip }
                });

                dialogRef.afterClosed().subscribe(result => {
                });
            }
    openDialog2(pID): void {
                let dialogRef = this.dialog.open(plandetailDialog, {
                    // width: '300px',
                    // data: { productID: pID, zip: this.zip }
                });

                dialogRef.afterClosed().subscribe(result => {
                });

            }


}

    @Component({
        selector: 'premise-dialog',
        templateUrl: 'premise-dialog.html',
    })

    export class PremiseDialog {
    product_id;
    premiseID;
    signup;
    city;
    state;


    // premise_id ='';
    zip_code;
    digitsOnly = '^[0-9,-]+$';
    // private http: any;

    constructor(private http: HttpClient, private sg: SimpleGlobal,
        public dialogRef: MatDialogRef < PremiseDialog >,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
        this.product_id = data.productID;
        console.clear(); console.log(this.product_id);
        //this.zipCode = data.zip;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    premiseIdData() {
        // alert(this.premiseID.toString().length)
        // alert('hello');
        if (this.premiseID && this.premiseID.toString().length === 17) {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.put(Config.api + 'premiseid/', { "premiseid": this.premiseID }, { headers: headers })
                .subscribe(Res => {
                    console.log(Res);
                    this.city = Res[0].city;
                    this.state = Res[0].state;
                    localStorage.setItem("signupDetails", JSON.stringify(Res));
                    localStorage.setItem("signedupcompanyid", this.product_id);
                    localStorage.setItem("consumerPremiseID", this.premiseID);

                    //   return JSON.parse(localStorage.getItem("premiseID"))
                    // this.sg['products'] = Res.json()['Results'];
                    // this.data.changeProducts(this.sg['products']);

                });
        }
    }

    premiseESID() {
        // alert(this.premiseID.toString().length)
        // alert('hello');
        if (this.premiseID && this.premiseID.toString().length === 17) {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
            this.http.post(Config.api + 'esid/', { "premiseid": this.premiseID }, { headers: headers })
                .subscribe(Res => {
                    console.log(Res);
                    this.city = Res[0].city;
                    this.state = Res[0].state;
                    localStorage.setItem("signupDetails", JSON.stringify(Res));
                    localStorage.setItem("signedupcompanyid", this.product_id);
                    //   return JSON.parse(localStorage.getItem("premiseID"))
                    // this.sg['products'] = Res.json()['Results'];
                    // this.data.changeProducts(this.sg['products']);

                });
        }
    }

    signUp(f: NgForm) {
        this.router.navigate(['/signup/' + this.product_id]);
        this.dialogRef.close();
    }


};
@Component({
    selector: 'Plandetail-dialog',
    templateUrl: 'plandetail-dialog.html',
})

export class plandetailDialog {
    // product_id;
    // premiseID;
    // signup;
    city;
    state;


    // premise_id ='';
    zip_code;
    digitsOnly = '^[0-9,-]+$';
    // private http: any;

    constructor(private http: HttpClient, public sg: SimpleGlobal,
        public dialogRef: MatDialogRef<plandetailDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
        // this.product_id = data.productID;
        // console.clear(); console.log(this.product_id);
        //this.zipCode = data.zip;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }


    // signupdata() {
    // alert(this.premiseID.toString().length)
    // alert('hello');
    // if(this.premiseID&&this.premiseID.toString().length===17) {
    //   let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // this.http.get(Config.api + 'data_against_zipcode/' + this.zip_code + '', { headers: headers }),
    // this.http.post(Config.api + 'signup/'+ this.zip_code +'', {"premiseid": this.premiseID}, {headers: headers})
    // .subscribe(Res => {
    // console.log(Res);
    //  this.city = Res[0].city;
    // this.state = Res[0].state;
    // this.sg['products'] = Res.json()['Results'];
    // this.data.changeProducts(this.sg['products']);

    // });}

    // signUp(f: NgForm) {
    //     this.router.navigate(['/signup/' + this.product_id]);
    //     this.dialogRef.close();
}

