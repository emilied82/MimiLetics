import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { FormsModule, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DetailsPage } from '../details/details';
import { AddItemPage } from '../add-item/add-item';
import { Data } from '../../providers/data';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public items = [];  

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data, public file: File) {
      this.dataService.getData().then((entries) => { 
      if(entries && entries.length >0){
        this.items = JSON.parse(entries); 
        console.log("Getting "+this.items.length+" items from DataService");
      }else{
        console.log("Hardcoding data on homepage constructor");
        this.items = [
        {dataid: '1', weight: '55', date: '20/01/2016', imc: '17', fatRate: '23', muscleRate: '33'},
        {dataid: '2', weight: '58', date: '21/07/2016', imc: '19', fatRate: '30', muscleRate: '20'},
        {dataid: '3', weight: '56', date: '02/08/2016', imc: '18', fatRate: '28', muscleRate: '21'},
        {dataid: '4', weight: '57', date: '02/09/2016', imc: '19', fatRate: '27', muscleRate: '33'},
        {dataid: '5', weight: '56', date: '03/05/2017'},
        {dataid: '6', weight: '56,8', date: '22/07/2017'},
        {dataid: '7', weight: '56,3', date: '06/09/2017'}       
        ];
      } 
    }); 
  }

  ionViewWillEnter(){
    // S'il y a eu une suppression, on remet à jour les entrées
    this.dataService.getData().then((entries) => { 
      if(entries && entries.length >0){
        this.items = JSON.parse(entries); 
        console.log("Getting data from DataService: "+this.items+" lenght: "+this.items.length);
      }
    }); 

  }

  ionViewDidLoad(){}

  addItem(){ 
    let addModal = this.modalCtrl.create(AddItemPage); 
    addModal.onDidDismiss((item) => { 
          if(item){
            item.dataid = this.items.length + 1;
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

  sendData(){
    this.dataService.getData().then((entries) => { 
      if(entries && entries.length >0){
        this.items = JSON.parse(entries); 
        console.log("Getting data from DataService: "+this.items+" lenght: "+this.items.length);
        this.saveToCsv(this.items);
      }
    });

  } 

  saveToCsv(items){
    var csv: any = this.convertToCSV(items);
    var fileName: any = "fitnessData.csv";


    this.file.writeFile(this.file.externalRootDirectory, fileName, csv, true).then(
    _ => {
      alert('Success')
      }
    )
    .catch(err => {
        this.file.writeExistingFile(this.file.externalRootDirectory, fileName, csv).then(
          _ => {
            alert('Success')
          }
        )
        .catch(
          err => {
            alert('Failure');
            console.log("Contenu du csv: "+csv);
          }
        )
      }
    ) 

  } // end of saveToCsv function

  convertToCSV(items) {
    var csv: any = ''
    var line: any = ''
    var nbOfItems = items.length

    //Header ---> Colonnes du tableau
    
    csv += "ID;date;weight"+'\n';

    for (var i = 0; i < nbOfItems; i++) {
      line='';
      line += items[i].dataid +';'+ items[i].date+';'+items[i].weight;      
      csv += line + '\r\n';
    }  
    return csv
  } 
}
