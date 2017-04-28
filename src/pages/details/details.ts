import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from '../../providers/data';

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

	id;
	weight;
	date;
	imc;
	fatRate;
	muscleRate;
 
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, public dataService: Data) {
  }

  ionViewDidLoad() {
    
    this.id=this.navParams.get('item').dataid;    
    this.weight=this.navParams.get('item').weight;
    this.date=this.navParams.get('item').date;    
    this.imc=this.navParams.get('item').imc;
    this.fatRate=this.navParams.get('item').fatRate;
    this.muscleRate=this.navParams.get('item').muscleRate;    
    
  }

  deleteItem(){    
    console.log('Removing item nr '+this.id);
    // Getting itms list from DataService to create table => remove item => save table
    this.dataService.getData().then((entries) => { 
      if(entries){
        let items = [];
        items = JSON.parse(entries); 
        console.log("Items: "+items+" / Navparams: "+this.navParams.get('item'));
        var index = items.indexOf(this.navParams.get('item'), 0);
        console.log("Index to be removed:"+index);
        console.log("Longueur avant splice:"+items.length);
        items.splice(1, 1);// on enlève un élément situé à l'indice 1
        console.log("Longueur après splice:"+items.length);
        /*if (index > -1) {
           items.splice(1, 1);
           console.log("spliced list");
        }  */
        this.dataService.save(items);        
      }
    }); 
    
    this.navCtrl.pop();          
  }

}


