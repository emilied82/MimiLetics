import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
	
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.id=this.navParams.get('item').id;
    this.weight=this.navParams.get('item').weight;
    this.date=this.navParams.get('item').date;
    this.imc=this.navParams.get('item').imc;
    this.fatRate=this.navParams.get('item').fatRate;
    this.muscleRate=this.navParams.get('item').muscleRate;
    
    }

  deleteItem(item){
    /*var index = this.items.indexOf(item, 0);
    if (index > -1) {
       this.items.splice(item, 1);
    }*/
    alert("Deletion coming soon");        
  }

}


