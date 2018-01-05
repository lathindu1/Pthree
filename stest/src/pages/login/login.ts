import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  AlertController,
  ToastController
} from "ionic-angular";
import { TabsPage } from "..//tabs/tabs";
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [AngularFireAuth]
})
export class LoginPage {
  user = {} as User;
  responseData: any;
  userData = { email: "", password: "" };
  constructor(
    public navCtrl: NavController,
    public aFAuth: AngularFireAuth,
    private alertCtrl: AlertController,
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
      message:
        "Incorrect Login creditials",
      duration: 3000
    });
    toast.present();
  }
  async login(user: User) {
    try {
      this.aFAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      // .then(data => {
      this.alert("successfully You are logged in");

      this.responseData = user;
      console.log(this.responseData);
      localStorage.setItem("userData", JSON.stringify(this.responseData));

      this.navCtrl.setRoot(TabsPage);
      // })
    } catch (error) {
      //  this.presentToast();
        this.alert("Error Password of User Name");
    }
  }
}
