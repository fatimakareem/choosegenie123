import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpService } from '../serv/http-service';
declare var $: any;



@Component({
  selector: 'app-blogss',
  templateUrl: './blogss.component.html',
  styleUrls: ['./blogss.component.scss']
})
export class BlogssComponent implements OnInit {
  constructor(private https: HttpService, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  data: any = [];
  ngOnInit() {
    
    
    this.profile();
    //$( '.snippet' ).each( function () {
   // });
  }
  
  profile() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.https.get( 'http://192.168.30.238:9000/gettingblog_html/1/', { headers: headers })
      .subscribe(Res => {
        this.data = Res.json()[0].content1;
        console.log(this.data);
       // $( '.snippet' ).each( function () {
          $( '.snippet' ).html( $( 'snippet'  ).html() );
       // });
      });

  }
  fun(heading){
    this.router.navigate(['/blog/' + heading.split(' ').join('-')]);
    localStorage.setItem('heading', heading);
  }
}