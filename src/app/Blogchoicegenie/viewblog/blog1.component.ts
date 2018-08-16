import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Headers, Http, Response } from '@angular/http';
import {HttpService} from '../../serv/http-service';
import { Config } from '../../Config';
@Component({
  selector: 'app-blog1',
  templateUrl: './blog1.component.html',
  styleUrls: ['./blog1.component.scss']
})
export class Blog1Component implements OnInit {
data:any=[];
  constructor(private route: ActivatedRoute,private http: HttpService) { }
  private Sub: Subscription;
public heading1;
heading;
  ngOnInit() {
    this.fetchProducts();
    this.route.params.subscribe ( params => {
       
      });
      this.Sub = this.route.params.subscribe(params => {
      this.heading1= +params['heading1'] ;
      });
  }
  fetchProducts() {
    this.heading=localStorage.getItem('heading');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.get(Config.api+'filterblog/'+ this.heading +'/' ,{ headers: headers })
    .subscribe(Res => {
    this.data = Res.json()[0];
    console.log(this.data);
    });
    
    } 
}
