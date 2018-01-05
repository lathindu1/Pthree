import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController,
  ToastController
} from "ionic-angular";
// import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import {AngularFireAuth} from 'angularfire2/auth';
import { User } from '../../models/user';

// import { FirebaseProvider } from "../../providers/firebase/firebase";


@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
  providers: [AngularFireAuth]
})
export class SignupPage {
  user = {} as User;
  constructor(
    public aFAuth: AngularFireAuth,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {}

  alert(message: string) {
    let alert = this.alertCtrl.create({
      title: "Info",
      subTitle: message,
      buttons: ["OK"]
    });
    alert.present();
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Pleace incert correct Email and password (password shoud be containg 6 characters)",
      duration: 3000
    });
    toast.present();
  }
  async signup(user: User) {
    try{
   const result = this.aFAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      // .then(data => {
        if(result)
        {
        this.alert("successfully You are signed up");

        this.navCtrl.push(LoginPage);
      
                }        // })
    }
    catch (error) {
      // .catch(error => {
        // this.alert(error);
        this.presentToast();
      // });
    }
  }

  login() {
    //Login page link
    this.navCtrl.push(LoginPage);
  }
}
