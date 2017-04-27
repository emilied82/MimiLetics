import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.id=this.navParams.get('item').dataid;    
    this.weight=this.navParams.get('item').weight;
    this.date=this.navParams.get('item').date;    
    this.imc=this.navParams.get('item').imc;
    this.fatRate=this.navParams.get('item').fatRate;
    this.muscleRate=this.navParams.get('item').muscleRate;
    console.log("Id de la data: "+this.id+" date "+this.date);
    
  }

  deleteItem(){
    console.log('Removing item nr '+this.id);
    /*var index = this.items.indexOf(this.id, 0);
    if (index > -1) {
       this.items.splice(item, 1);
    }*/
    let navparams = {action:"delete", id:this.id};
    this.navCtrl.pop(navparams);         
  }

}


