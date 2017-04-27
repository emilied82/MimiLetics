import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { User } from '../../providers/user';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})

export class EditProfilePage {

	public userProfile = {};

  constructor(public navCtrl: NavController, public view: ViewController, public userService: User) {
  	this.userService.getProfile().then((profile) => { 
      if(profile){
        this.userProfile = JSON.parse(profile); 
        console.log(JSON.parse(profile)); // Object { firstname: "Emilie", lastname: "Didier", email: "milou506@hotmail.com", height: "175", weightgoal: "55", gender: "female" }
      }else{
        this.userProfile = {        
          firstname: "Emilie", 
          lastname: "Didier", 
          email: "milou506@hotmail.com",
          height: "175",
          weightgoal: "55",
          gender: "female"
        };   
        console.log("Hardcoding data");
        userService.save(this.userProfile);
      } 
    });   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfile');
  }

  saveProfile(){  	
    this.view.dismiss(this.userProfile); 
  }

  close(){
    this.view.dismiss();
  }

}
