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


public weightData = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
    // Build the arrays
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

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, { 
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Weight evolution",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [57, 59, 55, 56, 56, 55, 60],
                    spanGaps: false,
                }
            ]
        }
       });  
       this.lineChartImc = new Chart(this.lineCanvasImc.nativeElement, { 
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "IMC evolution",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "#247BA0",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#70C1B3",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [19, 20, 18, 19, 20, 21, 20],
                    spanGaps: false,
                }
            ]
        }
       }

        );  
        this.lineChartMuscleRate = new Chart(this.lineCanvasMuscleRate.nativeElement, { 
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Muscle rate evolution",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "#247BA0",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#70C1B3",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [19, 20, 18, 19, 20, 21, 20],
                    spanGaps: false,
                }
            ]
        }
       });  
       this.lineChartFatRate = new Chart(this.lineCanvasFatRate.nativeElement, { 
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "Fat rate evolution",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "#247BA0",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "#70C1B3",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [19, 20, 18, 19, 20, 21, 20],
                    spanGaps: false,
                }
            ]
        }
       });     
  }

}
