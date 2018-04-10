import { NgModule, ErrorHandler } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details';
import { GraphsPage } from '../pages/graphs/graphs';
import { ProfilePage } from '../pages/profile/profile';
import { AddItemPage } from '../pages/add-item/add-item';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { Data } from '../providers/data';
import { User } from '../providers/user';
import { DataWebService } from '../providers/data-web-service';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage, 
    GraphsPage,
    ProfilePage,
    AddItemPage,
    EditProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
    GraphsPage,
    ProfilePage,
    AddItemPage,
    EditProfilePage
  ],
  providers: [
    Data,
    User,
    DataWebService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
