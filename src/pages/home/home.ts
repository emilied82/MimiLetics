import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormsModule, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DetailsPage } from '../details/details';
import { AddItemPage } from '../add-item/add-item';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public items = [];
  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {
      this.dataService.getData().then((entries) => {
 
      if(entries){
        this.items = JSON.parse(entries); 
      }else{
        this.items = [
        {dataid: '1', weight: '55', date: '20/01/2016', imc: '17', fatRate: '23', muscleRate: '33'},
        {dataid: '1', weight: '58', date: '21/07/2016', imc: '19', fatRate: '30', muscleRate: '20'},
        {dataid: '1', weight: '58', date: '02/08/2016', imc: '19', fatRate: '28', muscleRate: '21'}        
        ];
      }
 
    });  	

  }

   ionViewDidLoad(){   
     
  }
  addItem(){
 
    let addModal = this.modalCtrl.create(AddItemPage);
 
    addModal.onDidDismiss((item) => {
 
          if(item){
            this.saveItem(item);            
          }
 
    });
 
    addModal.present();
 
  }
 
  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }
  viewItem(item){
  	this.navCtrl.push(DetailsPage, {
  		item: item
  	});
  }  
}
