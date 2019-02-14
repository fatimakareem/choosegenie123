import { Component,OnInit } from '@angular/core';
import { DataTableResource } from 'angular4-smart-table';
import hhh from './data-table-demo1-data';
import { Headers, Http, Response } from '@angular/http';
import { Config } from "../Config";


@Component({
    selector: 'data-table-demo-1',
    providers: [],
    templateUrl: './data-table-demo1.html',
    styleUrls: ['./data-table-demo1.css']
})
export class DataTableDemo1 implements OnInit{
    rev;
    itemResource;
   // itemResource = new DataTableResource(hhh);
    ngOnInit(){        

        this.getreview();
        if(this.getreview()){
         this.itemResource.count().then(count => this.itemCount = count);
        }
        
    }
    getreview() {
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.get('https://apis.rfpgurus.com/rf_p/rfp/date_entered/asc/50?page=1', { headers: headers })
        .subscribe(Res => {
        this.items=Res.json()['results'];
        console.log(this.rev)
 this.itemResource = new DataTableResource(this.items);
    // this.rate=this.rev['rate'];
    //     console.log(this.rate);
    //this.pager = this.pagerService.getPager(Res['Results'],Res['Total Pages']);
        });
        }
  
   
    items = [];
    itemCount = 0;

    constructor(private http:Http) {
        this.itemCount = 0;
       
       
    }

    reloadItems(params) {
     this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:

    rowClick(rowEvent) {
        console.log('Clicked: ' + rowEvent.row.item.category);
    }

    rowDoubleClick(rowEvent) {
        alert('Double clicked: ' + rowEvent.row.item.category);
    }

    rowTooltip(item) { return item.category; }
}
