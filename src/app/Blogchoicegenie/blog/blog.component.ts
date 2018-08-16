import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Config } from "../../Config";
import { ActivatedRoute, Router } from "@angular/router";
import { SimpleGlobal } from 'ng2-simple-global';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { HttpService } from '../../serv/http-service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private https: HttpService, public router: Router, private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private sg: SimpleGlobal) { }
  data: any = [];
  ngOnInit() {
    this.profile();
  }
  profile() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.https.get(Config.api + 'Gettingblog/', { headers: headers })
      .subscribe(Res => {
        this.data = Res.json();
        console.log(this.data);
      });

  }
  fun(heading){
    this.router.navigate(['/blog/' + heading.split(' ').join('-')]);
    localStorage.setItem('heading', heading);
  }
}