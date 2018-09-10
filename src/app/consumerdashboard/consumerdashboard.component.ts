import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Headers, Response, Http } from "@angular/http"

@Component({
  selector: 'app-consumerdashboard',
  templateUrl: './consumerdashboard.component.html',
  styleUrls: ['./consumerdashboard.component.scss']
})
export class ConsumerdashboardComponent implements OnInit {
  private notifier: NotifierService;
  user;
  constructor(private http: Http, notifier: NotifierService ) {
  
		this.notifier = notifier; }

  ngOnInit() {
    this.user= localStorage.getItem('custum');
    this.fun()
   
  }
fun(){
  if(this.user){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  this.http.post('http://192.168.30.238:9000/user_notify/', JSON.stringify({
  
    "username": this.user
  }), { headers: headers }).subscribe(Res => {
    console.log(Res);
    this.notifier.show( {
      type: 'success',
      message: 'Admin Approve your Review!',
      id: 'THAT_NOTIFICATION_ID' // Again, this is optional
    } );
  });
  
}
}
}