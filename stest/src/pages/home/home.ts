import { Component } from '@angular/core';
import { NavController , App } from 'ionic-angular';
// import {WelcomePage} from '../welcome/welcome';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // name1 = "";
  // name2 = "";
  public userdetails : any;
  public responseData : any;
  public dataSet : any;
   userPostData = {"from_city": "","to_city": ""};

  constructor(public navCtrl: NavController , public app:App, public authService:AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userdetails = data.userData;
    
  }
 
  getcity() {
    this.authService.postData(this.userPostData, 'cityfind')
      .then((result) => {
        this.responseData = result;
        if (this.responseData.cityData) {
          this.dataSet = this.responseData.cityData;
        } else {}
      }, (err) => {

      });
  }
  
  // convertTime(created) {
  //   let date = new Date(created * 1000);
  //   return date;
  // }

}
