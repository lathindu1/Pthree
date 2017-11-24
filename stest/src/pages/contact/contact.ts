import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {WelcomePage} from '../welcome/welcome';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public app:App) {

  }
  backtowelcome()
  {
   this.app.getRootNav().push(WelcomePage);
    // this.app.getRootNav().push(WelcomePage);
    //  root.popToRoot();
  }
  logout(){
    // Remove API token 
    localStorage.clear();
    setTimeout(()=>this.backtowelcome(),2000);
}
}
