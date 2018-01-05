import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { GoogleMaps } from "@ionic-native/google-maps";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LinkyModule } from 'angular-linky';
import { MomentModule } from 'angular2-moment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
// import { SignaturePadModule } from 'angular2-signaturepad';
// import { AuthServiceProvider } from '../providers/auth-service/auth-service';


const firebaseConfig = {
  apiKey: "AIzaSyCEiZije0ChzPX-19ozY8gfK71nE5mxoJY",
  authDomain: "slnbts-ed2e7.firebaseapp.com",
  databaseURL: "https://slnbts-ed2e7.firebaseio.com",
  projectId: "slnbts-ed2e7",
  storageBucket: "slnbts-ed2e7.appspot.com",
  messagingSenderId: "225698066570"
};



@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    SignupPage,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LinkyModule,
    MomentModule,

    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    SignupPage,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    FirebaseProvider,
    SplashScreen,
    GoogleMaps,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    FirebaseProvider
    // AuthServiceProvider
  ]
})
export class AppModule {}
