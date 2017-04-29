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
        let newItems = [];
        items = JSON.parse(entries);                 
        // On parcourt la liste des items et on les copie dans un nouveau tableau, sauf celui qu'on veut supprimer
        for(let newItem of items){
          //console.log(newItem.dataid+" VS "+this.navParams.get('item').dataid);
          if(newItem.dataid != this.navParams.get('item').dataid){
            newItems.push(newItem);
          }
        }
        this.dataService.save(newItems);        
      }
    }); 
    
    this.navCtrl.pop();          
  }

}


