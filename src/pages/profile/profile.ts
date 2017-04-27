import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../providers/user';
import { EditProfilePage } from '../edit-profile/edit-profile';

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

  public userProfile = {};
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: User, public modalCtrl: ModalController) {
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
    console.log('ionViewDidLoad Profile');    
  }

  editProfile(){ 
    let addModal = this.modalCtrl.create(EditProfilePage); 
    addModal.onDidDismiss((profile) => { 
      if(profile){
        this.saveProfile(profile);            
      } 
    }); 
    addModal.present(); 
  }

  saveProfile(profile){
    this.userProfile = profile;
    this.userService.save(this.userProfile);
      
  }

}
