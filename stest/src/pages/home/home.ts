import { Component } from "@angular/core";
import { NavController , App , ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {RoutFind} from '../../models/routFind';
import { RoutFind2 } from "../../models/routFind2";
 import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
 import { AboutPage } from "../about/about";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class HomePage {
  routFind$: FirebaseListObservable<RoutFind[]>;
  routFind2 = {} as RoutFind2;

  public UserDetails: any;
  responseData: any;

  constructor(
    public navCtrl: NavController,
    public app: App,
    public aFAuth: AngularFireAuth,
    private toast: ToastController,
    private aFDatabase: AngularFireDatabase
  ) {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.UserDetails = data.email;
    console.log(this.UserDetails);

    this.routFind$ = this.aFDatabase.list("RoutList/Initial");
    this.routFind$.subscribe(x => console.log(x));
  }
  FindBusList(routFind2) {
      let usermapData = { from: "", to: "" };
      usermapData = routFind2;
      localStorage.setItem("BusCityData", JSON.stringify(usermapData));
      var from = routFind2.from.toLowerCase();
      var to = routFind2.to.toLowerCase();
    this.routFind$ = this.aFDatabase.list(
      "RoutList/" + [from] + "/" + [to]
    );
    this.routFind$.subscribe(x => console.log(x));
  }

  openMapdaa(user) {
    this.responseData = user;
  //  console.log(this.responseData);
    localStorage.setItem("BusGpsData", JSON.stringify(this.responseData));
    const BusGpsDatas = JSON.parse(localStorage.getItem("BusGpsData"));
 //   console.log("gps data"+BusGpsDatas);
     this.navCtrl.setRoot(AboutPage);
  }
}