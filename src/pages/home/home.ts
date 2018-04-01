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
        for (let item of this.items) {         
          item.date = new Date(item.date);
        }       
      }else{
        console.log("Hardcoding data on homepage constructor");
        this.items = [
        {dataid: '1', weight: '55', date: '2016-01-20', imc: '17', fatRate: '23', muscleRate: '33'},
        {dataid: '2', weight: '58', date: '2016-07-21', imc: '19', fatRate: '30', muscleRate: '20'},
        {dataid: '3', weight: '56', date: '2016-08-02', imc: '18', fatRate: '28', muscleRate: '21'},
        {dataid: '4', weight: '57', date: '2016-09-02', imc: '19', fatRate: '27', muscleRate: '33'},
        {dataid: '5', weight: '56', date: '2017-03-05'},
        {dataid: '6', weight: '56,8', date: '2017-07-22'},
        {dataid: '7', weight: '56,3', date: '2017-09-06'}       
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
        this.sortByDate(); 
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
    this.sortByDate();
    this.dataService.save(this.items);
  }

  viewItem(item){
  	this.navCtrl.push(DetailsPage, {
  		item: item
  	});
    
  }

  sortByDate(){
    // Sorting items by date
    this.items.sort(function(a, b) {
      console.log("sorting function");
      var x = new Date(a.date); 
      var y = new Date(b.date);               
      console.log("Result of sorting "+x+" VS "+y+" : "+(x < y));
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });  
  }

  sortByWeight(){
    // sort
    this.items.sort(function(a, b) {
      console.log("sorting function");          
      var x = a.weight; 
      var y = b.weight;          
      console.log("sorting result: "+(x < y));
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
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
    
    csv += "ID;date;weight"+'\r\n';

    for (var i = 0; i < nbOfItems; i++) {
      line='';
      line += items[i].dataid +';'+ items[i].date+';'+items[i].weight;      
      csv += line + '\r\n';
    }  
    return csv
  } 
}
