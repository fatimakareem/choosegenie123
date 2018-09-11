import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Headers, Response, Http } from "@angular/http"
import { Config } from "../Config";

@Component({
  selector: 'app-consumerdashboard',
  templateUrl: './consumerdashboard.component.html',
  styleUrls: ['./consumerdashboard.component.scss']
})
export class ConsumerdashboardComponent implements OnInit {
  private notifier: NotifierService;
  user;
  total;
  constructor(private http: Http, notifier: NotifierService) {

    this.notifier = notifier;
  }

  ngOnInit() {
    this.user = localStorage.getItem('custum');
    this.fun()

  }
  fun() {
    if (this.user) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get(Config.api + 'get_unread_notifications/' + this.user, { headers: headers }).subscribe(Res => {


        this.total = Res.json()['Total Result']
        console.log(this.total);
        for (let i = 0; i < 6; i++) {
          
          this.notifier.show({
            type: 'success',
            message: 'Admin Approve your Review!',
            id: 'THAT_NOTIFICATION_ID' // Again, this is optional
          });
          console.log(i);
        }

      });

    }
  }
}