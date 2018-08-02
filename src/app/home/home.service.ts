import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from "../Config";
import {HttpService} from '../serv/http-service';
@Injectable()
export class HomeService {
public username;
  months:any[];
  product;
  items;
  constructor(private http: Http) {this.username = localStorage.getItem('username');
               this.product = localStorage.getItem('PRO');
}

  searchProducts(id,page) {
    console.log(id)
   
   return this.http.get(Config.api+'zipcodedata/' + id +'?page='+page).map((response: Response) => response.json());
    }
  searchProducts1(id,page) {
    console.log(id)
   return this.http.get(Config.api+'deregulated/' + id +'?page='+page +'').map((response: Response) => response.json());
  }
  inactiveproduct(title,page){
    console.log(title)
   
   return this.http.get(Config.api+'inactive/' + this.username +'?page='+page +'/').map((response: Response) => response);

  }
  deregulatedinactivepro(title,page){
    console.log(title)
   
   return this.http.get(Config.api+'deregulated_inactive_product/' + this.username +'?page='+page +'/').map((response: Response) => response);

  }
  filter(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,price,sort,item,min,max) {
 console.log(price)
    if(price == undefined){
      console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,price,sort,item,min,max)
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
        "plan_type1": fixed,
        "plan_type2": market,
        "plan_type3": vari,
        "plan_information1": months1,
        "plan_information2": months2,
        "plan_information3": months3,
        "plan_information4": months4,
        "plan_information5": months5,
        "plan_information6": months6,
        "prepaid": prepaid,
        "noprepaid": notprepaid,
        "planmin": planmin,
        "time":time,
        "notime":nottime,
        "renewablerate":renewable,
        "company":name,
        "itemsperpage":item,
        "dsc":sort

       }), 
      {headers: headers}).map((response: Response) => response.json());
      }
    else if(price==500){
    console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,price,sort,item,min,max)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
      "plan_type1": fixed,
      "plan_type2": market,
      "plan_type3": vari,
      "plan_information1": months1,
      "plan_information2": months2,
      "plan_information3": months3,
      "plan_information4": months4,
      "plan_information5": months5,
      "plan_information6": months6,
      "prepaid": prepaid,
      "noprepaid": notprepaid,
      "planmin": planmin,
      "time":time,
      "notime":nottime,
      "renewablerate":renewable,
      "company":name,
      "itemsperpage":item,
      "price_500_kwh_min_price": min,
      "price_500_kwh_max_price": max,
      "dsc":sort
     }), 
    {headers: headers}).map((response: Response) => response.json());
    }
  
 else if(price==1000){
    console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,price,sort,item,min,max)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
      "plan_type1": fixed,
      "plan_type2": market,
      "plan_type3": vari,
      "plan_information1": months1,
      "plan_information2": months2,
      "plan_information3": months3,
      "plan_information4": months4,
      "plan_information5": months5,
      "plan_information6": months6,
      "prepaid": prepaid,
      "noprepaid": notprepaid,
      "planmin": planmin,
      "time":time,
      "notime":nottime,
      "renewablerate":renewable,
      "company":name,
      "itemsperpage":item,
      "price_1000_kwh_min_price": min,
      "price_1000_kwh_max_price": max,
      "dsc":sort
     }), 
    {headers: headers}).map((response: Response) => response.json());
    }
  
 else if(price==2000){
    console.log(page,id,months1,months2,months3,months4,months5,months6,months7,fixed,vari,market,notprepaid,prepaid,planmin,time,nottime,renewable,name,price,sort,item,min,max)
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(Config.api+'multifilter/'+id +'?page='+page, JSON.stringify({
      "plan_type1": fixed,
      "plan_type2": market,
      "plan_type3": vari,
      "plan_information1": months1,
      "plan_information2": months2,
      "plan_information3": months3,
      "plan_information4": months4,
      "plan_information5": months5,
      "plan_information6": months6,
      "prepaid": prepaid,
      "noprepaid": notprepaid,
      "planmin": planmin,
      "time":time,
      "notime":nottime,
      "renewablerate":renewable,
      "company":name,
      "itemsperpage":item,
        "price_2000_kwh_min_price": min,
        "price_2000_kwh_max_price": max,
      "dsc":sort
     }), 
    {headers: headers}).map((response: Response) => response.json());
    }
 
  }
  deregulatedfilter(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com) {
    // console.log(price)
      if(items==undefined){
        this.items="10";
         console.log(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com)
         const headers = new Headers();
         headers.append('Content-Type', 'application/json');
         return this.http.post(Config.api+'deregulated_genericfilter/'+zip_code +'?page='+page, JSON.stringify({
          
          "plan_information5": months1,
           "plan_information1": months2,
           "plan_information2": months3,
          
           "plan_information3": months5,
           "plan_information4": months6,
             "company":com,
           "itemsperpage": this.items,
           "dsc":dsc
          }), 
         {headers: headers}).map((response: Response) => response.json());
         } else{
          console.log(page,zip_code,months1,months2,months3,months5,months6,items,dsc,com)
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this.http.post(Config.api+'deregulated_genericfilter/'+zip_code +'?page='+page, JSON.stringify({
           
           "plan_information5": months1,
            "plan_information1": months2,
            "plan_information2": months3,
           
            "plan_information3": months5,
            "plan_information4": months6,
              "company":com,
            "itemsperpage":items,
            "dsc":dsc
           }), 
          {headers: headers}).map((response: Response) => response.json());
          }
        }
        }
        
     
<<<<<<< HEAD
=======

 
>>>>>>> 58e51331bf67fc5da588fca978adecb5a41635da
