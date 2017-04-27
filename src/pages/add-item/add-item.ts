import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
 
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html'
})

export class AddItemPage {
 
  weight;
  imc;
  musclerate;
  fatrate;
  date;

  constructor(public navCtrl: NavController, public view: ViewController) {
 
  }
 
  saveItem(){

    var d = new Date(Date.now());
     
    let newItem = {
        weight: this.weight,
        imc: this.imc,
        muscleRate: this.musclerate,
        fatRate: this.fatrate,
        date: d.toLocaleDateString(),
        userid: '2'
    };    
    this.view.dismiss(newItem);
 
  }
 
  close(){
    this.view.dismiss();
  }
 
}