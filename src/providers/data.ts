import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  constructor(public storage: Storage){
 
  }
 
  getData() {
    return this.storage.get('entries');  
  }
 
  save(data){
    // saves all items: basically erases the previous content
    let newData = JSON.stringify(data);
    this.storage.set('entries', newData);
  }
}
