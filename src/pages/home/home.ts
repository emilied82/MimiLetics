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
      //this.loadPeople();
      // OBS ? Sauvegarder les données en mémoire locale - this.dataService.save(this.items);

      /*
      OBSOLETE: récupération des infos dans la mémoire locale de l'app, avant connexion au web-service
      this.dataService.getData().then((entries) => { 
      if(entries && entries.length >0){
        this.items = JSON.parse(entries); 
        console.log("Getting "+this.items.length+" items from DataService");
      }
    }); */
  }  

  loadPeople(){
    this.dataWebService.load()
    .then(data => {      
      
      // data est de type any[];
      for (let item of data) { 
        console.log(item);
        this.items.push(item);        
      }
    })
    .catch(err => {
      console.log("Home : erreur catchée"+err);
    });

  }

  ionViewWillEnter(){
    // S'il y a eu une suppression, on remet à jour les entrées
    /*
      OBSOLETE: récupération des infos dans la mémoire locale de l'app, avant connexion au web-service
      this.dataService.getData().then((entries) => { 
      if(entries && entries.length >0){
        this.items = JSON.parse(entries); 
        console.log("Getting data from DataService: "+this.items+" lenght: "+this.items.length);
      }
    }); */
     this.loadPeople();
     
     

  }

  ionViewDidLoad(){
    console.log("Getting data from WebDataService: "+this.items.length);
  }

  addItem(){ 
    let addModal = this.modalCtrl.create(AddItemPage); 
    addModal.onDidDismiss((item) => { 
          if(item){
            item.dataid = this.items.length + 1;
            this.saveItem(item);
            // TODO: need to update or reload graphs page      
          } 
    }); 
    addModal.present(); 
  }
 
  saveItem(item){
    this.items.push(item);
    //this.dataService.save(this.items);
    this.dataWebService.addEntry(item);
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      item: item
    });
    
  }  
}
