import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Data } from '../../providers/data';

/**
 * Generated class for the Graphs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-graphs',
  templateUrl: 'graphs.html',
})
export class GraphsPage {

// Graphs-related declarations
@ViewChild('lineCanvas') lineCanvas; 
lineChart: any;
@ViewChild('lineCanvasImc') lineCanvasImc; 
lineChartImc: any;
@ViewChild('lineCanvasMuscleRate') lineCanvasMuscleRate; 
lineChartMuscleRate: any;

@ViewChild('lineCanvasFatRate') lineCanvasFatRate; 
lineChartFatRate: any;

public items = []; // tableau
public weightDataLabels = [];
public weightDataEntries = [];
public imcDataLabels = [];
public imcDataEntries = [];
public muscleRateDataLabels = [];
public muscleRateDataEntries = [];
public fatRateDataLabels = [];
public fatRateDataEntries = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {    
    // Try and get all the entries from data service
    this.dataService.getData().then((entries) => { 
      if(entries){
        console.log("Retrieving data from datasource");
        this.items = JSON.parse(entries);        
      }
    });
    // If no data has been retrieved from datasource, there are hardcoded
    if(this.items.length == 0){
        this.items = [
        {dataid: '1', weight: '55', date: '20/01/2016', imc: '17', fatRate: '23', muscleRate: '33'},
        {dataid: '2', weight: '58', date: '21/07/2016', imc: '19', fatRate: '30', muscleRate: '20'},
        {dataid: '3', weight: '56', date: '02/08/2016', imc: '18', fatRate: '28', muscleRate: '21'},
        {dataid: '4', weight: '57', date: '02/09/2016', imc: '19', fatRate: '27', muscleRate: '33'}        
        ];
        console.log("Hardcoding data. Table length: "+this.items.length); // ici, le tableau fait 3 de longueur
    }
    
    for (var i = 0; i < this.items.length; i++) {         
        console.log("date : "+this.items[i].date + " / poids : "+this.items[i].weight);// Fonctionne et retourne "hici : [object Object]          
        this.weightDataLabels.push(this.items[i].date);
        this.weightDataEntries.push(this.items[i].weight);
        if(this.items[i].imc != null){
            this.imcDataLabels.push(this.items[i].date);
            this.imcDataEntries.push(this.items[i].imc);
        }
        if(this.items[i].muscleRate != null){
            this.muscleRateDataLabels.push(this.items[i].date);
            this.muscleRateDataEntries.push(this.items[i].muscleRate);
        }
        if(this.items[i].fatRate != null){
            this.fatRateDataLabels.push(this.items[i].date);
            this.fatRateDataEntries.push(this.items[i].fatRate);
        }
    }   
   
  }

  ionViewDidLoad() {       

    // TODO: exécuter ce code seulement si items not null. Else: message d'erreur
    this.lineChart = new Chart(this.lineCanvas.nativeElement, { 
        type: 'line',
        data: {
            labels: this.weightDataLabels,
            datasets: [
                {
                    label: "Weight evolution",
                    fill: true, // false or true
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FF1654",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 2, // 1
                    pointHitRadius: 10,
                    data: this.weightDataEntries,
                    spanGaps: false,
                }
            ]
        }
       });  
       this.lineChartImc = new Chart(this.lineCanvasImc.nativeElement, { 
        type: 'line',
        data: {
            labels: this.imcDataLabels,
            datasets: [
                {
                    label: "IMC evolution",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "#F3FFBD",
                    borderColor: "#247BA0",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FF1654",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.imcDataEntries,
                    spanGaps: false,
                }
            ]
        }
       }

        );  
        this.lineChartMuscleRate = new Chart(this.lineCanvasMuscleRate.nativeElement, { 
        type: 'line',
        data: {
            labels: this.muscleRateDataLabels,
            datasets: [
                {
                    label: "Muscle rate evolution",
                  fill: true, // false or true
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FF1654",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 2, // 1
                    pointHitRadius: 10,
                    data: this.muscleRateDataEntries,
                    spanGaps: false,
                }
            ]
        }
       });  
       this.lineChartFatRate = new Chart(this.lineCanvasFatRate.nativeElement, { 
        type: 'line',
        data: {
            labels: this.fatRateDataLabels,
            datasets: [
                {
                    label: "Fat rate evolution",
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: "#F3FFBD",
                    borderColor: "#247BA0",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#FF1654",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 2,
                    pointHitRadius: 10,
                    data: this.fatRateDataEntries,
                    spanGaps: false,
                }
            ]
        }
       });     
  }

}
