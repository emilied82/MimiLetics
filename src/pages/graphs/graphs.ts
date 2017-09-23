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

public weightDataLabels = [];
public weightDataEntries = [];
public imcDataLabels = [];
public imcDataEntries = [];
public muscleRateDataLabels = [];
public muscleRateDataEntries = [];
public fatRateDataLabels = [];
public fatRateDataEntries = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {       
       
  }

 ionViewDidEnter(){
    // Si la vue est réaffichée, on vide tous les graphs + les tableaux de données pour les remettre à jour
    this.lineChart = null;
    this.weightDataLabels = [];
    this.weightDataEntries = [];

    this.lineChartImc = null;
    this.imcDataLabels = [];
    this.imcDataEntries = [];

    this.lineChartFatRate = null;
    this.muscleRateDataLabels = [];
    this.muscleRateDataEntries = [];

    this.lineChartMuscleRate = null;
    this.fatRateDataLabels = [];
    this.fatRateDataEntries = [];

    this.dataService.getData().then((entries) => { 
         if(entries){
            let items = [];      
            items = JSON.parse(entries);
            for (let item of items) {         
                this.weightDataLabels.push(item.date);
                this.weightDataEntries.push(item.weight); 
                if(item.imc != null){
                    this.imcDataLabels.push(item.date);
                    this.imcDataEntries.push(item.imc);
                }
                if(item.muscleRate != null){
                    this.muscleRateDataLabels.push(item.date);
                    this.muscleRateDataEntries.push(item.muscleRate);
                }
                if(item.fatRate != null){
                    this.fatRateDataLabels.push(item.date);
                    this.fatRateDataEntries.push(item.fatRate);
                }    
            }
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
            });
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
    });
}
ionViewDidLoad() {
    /*this.dataService.getData().then((entries) => { 
        if(entries){
            let items = [];      
            items = JSON.parse(entries);
            for (let item of items) {         
                console.log("date : "+item.date + " / poids : "+item.weight);// Fonctionne et retourne "hici : [object Object]          
                this.weightDataLabels.push(item.date);
                this.weightDataEntries.push(item.weight);            
                if(item.imc != null){
                    this.imcDataLabels.push(item.date);
                    this.imcDataEntries.push(item.imc);
                }
                if(item.muscleRate != null){
                    this.muscleRateDataLabels.push(item.date);
                    this.muscleRateDataEntries.push(item.muscleRate);
                }
                if(item.fatRate != null){
                    this.fatRateDataLabels.push(item.date);
                    this.fatRateDataEntries.push(item.fatRate);
                }
            }
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
    });*/        
            
  }
}
