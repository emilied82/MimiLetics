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

  	/*let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    headers.append("Content-Type", 'application/json'); 
    //headers.append("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, PUT');*/

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
	    // post(url: string, body: any, options?: RequestOptionsArgs)
	    //this.http.get('https://randomuser.me/api/?results=10')
	      this.http.post('http://localhost/fitness-app/api.php?rquest=getdata', '{"userid": 2}', requestOptions )
	      .map(res => res.json())
	      .subscribe(data => {
			this.data = data;
			console.log("data-web-service: don't have the data yet "+data);
			resolve(this.data);
		}, err => reject(err));
	  });
	}

	 addEntry(item: any) {
	 	console.log("entering add entry"+item.weight);
	 	let weight = item.weight; // obligatoire
	 	let date = "2018-04-11 00:00:00"; // obligatoire 
        let userid = item.userid; // obligatoire
        let imc =  item.imc;
        let muscleRate =  item.musclerate;
        let fatRate = item.fatrate;
        // ajouter visceral fat level & metabolism
       
        let headers = new Headers(); 
    	headers.append("Access-Control-Allow-Origin" , 'http://localhost:8100');    
    	headers.append("Content-Type", 'application/x-www-form-urlencoded');

	    let requestOptions = new RequestOptions({ headers:headers,withCredentials: true});
		let body = '{ "weight": '+weight+',  "userid": '+userid+', "date_time": "'+date+'"}';
		/*if (imc != null){ body += ", 'imc': "+imc}
		if (muscleRate != null){ body += ", 'muscleRate': "+muscleRate}
		body += "}";*/		

		/*let formData = new FormData();
	      formData.append("weight", weight);
	      formData.append("userid", userid);
	      formData.append("datetime", date);*/
     

		//imc:"+imc+"musclerate: "+muscleRate+",
    	
	  	return this.http.post('http://localhost/fitness-app/api.php?rquest=postdata', body, requestOptions) .map(res => res/*.json()*/).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log("ERROR!: ", err);
          }
      );   

 	}
}
