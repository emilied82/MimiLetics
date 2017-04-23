import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	firstname;
	lastname;
	email;
	height;
	weightgoal;
	gender;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.firstname = "emilie";
  	this.lastname = "didier";
  	this.email = "milou506@hotmail.com";
  	this.gender = "female";
  	this.height = "1.75";
  	this.weightgoal = "55";
   console.log('ionViewDidLoad Profile');    
  }

}
