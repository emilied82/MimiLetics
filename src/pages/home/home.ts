import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormsModule, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DetailsPage } from '../details/details';
import { AddItemPage } from '../add-item/add-item';
import { Data } from '../../providers/data';
import { DataWebService } from '../../providers/data-web-service';


@Component({
  selector: 'page-home', 
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];  
  
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public dataWebService: DataWebService) {
  }

  /* Retrieving entries from DataWebService*/
  loadEntriesFromWebService(){
    this.dataWebService.load()
    .then(data => {
      this.fitnessentries = data;
      console.log("Home: récupération données BDD "+data+" lenght: "+data.length);
      console.log("Fitnessentries "+this.fitnessentries+" lenght: "+this.fitnessentries.length);
    })
    .catch(err => {
      console.log("Home : erreur sur récupération entrées BDD. Ajouter ici basculement sur mémoire locale de l'appareil.");
    });

  }

   ionViewWillEnter(){
    // A chaque fois qu'on revient sur la home, on remet à jour les entrées
    this.loadEntriesFromWebService();
 }

  ionViewDidLoad(){
    //console.log("Getting data from WebDataService: "+this.items.length);
  }

  addItem(){ 
    let addModal = this.modalCtrl.create(AddItemPage); 
    addModal.onDidDismiss((item) => { 
          if(item){
            item.dataid = this.items.length + 1;
            this.saveItem(item);
            this.dataWebService.addEntry(item);      
            // TODO: need to update or reload graphs page      
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
