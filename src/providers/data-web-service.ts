import { Injectable } from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataWebService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataWebService {
	 public data: any;

  constructor(public http: Http) {
    console.log('Hello DataWebService Provider');
  }

  load() {
  	
    let headers = new Headers();     
    headers.append("Access-Control-Allow-Origin" , 'http://localhost:8100');    
    headers.append("Content-Type", 'application/x-www-form-urlencoded');
    let requestOptions = new RequestOptions({ headers:headers,withCredentials: true});
    
	  if (this.data) {
	    // already loaded data	    
	    console.log("data-web-service: already loaded data"+this.data);
	    return Promise.resolve(this.data);
	  }

	  // don't have the data yet
	  return new Promise((resolve, reject) => {	  	
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data	 
	    //this.http.get('https://randomuser.me/api/?results=10')
	      this.http.post('http://localhost/fitness-app/api.php?rquest=getdata', '{"userid": 1}', requestOptions )
	      .map(res => res.json())
	      .subscribe(data => {
			this.data = data;			
			resolve(this.data);
		}, err => reject(err));
	  });
	}

	addEntry(item) {  	
    
	}


}
