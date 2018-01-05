import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import {TabsPage} from '../tabs/tabs'

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  public UserDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (localStorage.getItem("userData")) {
      console.log("Local storage is full");
      const data = JSON.parse(localStorage.getItem("userData"));
      this.UserDetails = data.userData;
      console.log(data.email);
      this.navCtrl.setRoot(TabsPage);
    }
  }
  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
