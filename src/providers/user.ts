import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

  constructor(public storage: Storage){
 	
  }

  getProfile(){
  		return this.storage.get('profile'); 
  }
  
  save(userProfile){
    // saves all items: basically erases the previous content
    let newData = JSON.stringify(userProfile);
    this.storage.set('profile', newData);
  }
}
