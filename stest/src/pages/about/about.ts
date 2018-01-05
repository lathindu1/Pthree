import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import {
  GoogleMaps,
  GoogleMap
  // GoogleMapsEvent,
  // GoogleMapOptions,
  // MarkerOptions,
  // LatLng,
  // Marker
} from "@ionic-native/google-maps";
import {
  AngularFireDatabase,
  FirebaseListObservable
} from "angularfire2/database-deprecated";
import { AngularFireAuth } from "angularfire2/auth";
import { PlaceFind } from "../../models/PlaceFind";
import { PlaceD } from "../../models/PlaceD";
// import { lang } from "moment";
declare var google: any;
@Component({
  selector: "page-about",
  templateUrl: "about.html",
  providers: [AngularFireAuth, AngularFireDatabase, Geolocation]
})
export class AboutPage {
  placeFind$: FirebaseListObservable<PlaceFind[]>;
  data: any;
  // y:any;
  BusGpsUserKey: any;
  public lats: any;
  public PlaceD: PlaceD[];
  public fromcity: any;
  public tocity: any;
  public distancekm: any;
  public speedOfBus: any;
  //  BusCityData = { lat: "", lng: "", timestamp: "" };
  // map: any;
  @ViewChild("map") mapRef: ElementRef;

  constructor(
    public navCtrl: NavController,
    public googleMaps: GoogleMaps,
    public aFAuth: AngularFireAuth,
    private aFDatabase: AngularFireDatabase,
    private geolocation: Geolocation
  ) {
    this.data = null;
  }
  ionViewDidLoad() {
    // this.initMap();
    const BusGpsData = JSON.parse(localStorage.getItem("BusGpsData"));
    this.BusGpsUserKey = BusGpsData;
    // console.log("bus user2nd-:" + BusGpsData);
    this.FindBusLatLng(BusGpsData);
    // this.showMap();
    // console.log(this.mapRef);
  }
  FindBusLatLng(BusGpsUserKey) {
    let usermapData = { lat: "", lng: "" };
    this.placeFind$ = this.aFDatabase.list("GpsUsers/" + [BusGpsUserKey]);
    this.placeFind$.subscribe((PlaceD: PlaceD[]) => {
      usermapData = PlaceD[1];
      this.showMap(usermapData[0], usermapData[1]);
    });
  }

  showMap(latt, lngg) {
    var mylat = null;
    var mylng = null;
    var buslat = latt;
    var buslng = lngg;
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    const location = new google.maps.LatLng(latt, lngg);
    this.geolocation.getCurrentPosition().then(resp => {
      (mylat = resp.coords.latitude);
       (mylng = resp.coords.longitude);
      var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
      // var iconBase2 = "../../../resources/";

      var icons = {
        parking: { icon: iconBase + "parking_lot_maps.png" },
        library: { icon: iconBase + "library_maps.png" },
        info: { icon: iconBase + "info-i_maps.png" }
      };
      var features = [
        { position: new google.maps.LatLng(latt, lngg), type: "info" },
        {
          position: new google.maps.LatLng(
            resp.coords.latitude,
            resp.coords.longitude
          ),
          type: "library"
        }
      ];

      features.forEach(function(feature) {
        var marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          map: map
        });
      });
    });
    const options = {
      center: location,
      Zoom: 10,
      streetViewControl: false,
      disableDefaultUI: true,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }]
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }]
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }]
        }
      ]
    };

    const map = new google.maps.Map(this.mapRef.nativeElement, options);

    let BusGpsDatas = { from: "", to: "" };
    BusGpsDatas = JSON.parse(localStorage.getItem("BusCityData"));
    this.fromcity = BusGpsDatas.from;
    this.tocity = BusGpsDatas.to;
    this.findHolt(this.fromcity, this.tocity, mylat, mylng);
    this.findBusspead(this.fromcity,this.tocity, mylat, mylng);
    this.calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      BusGpsDatas.from,
      BusGpsDatas.to
    );
    directionsDisplay.setMap(map);
  }
  addMarker(position, map) {
    var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    return new google.maps.Marker({
      position,
      icon: iconBase + "library_maps.png",
      map
    });
  }
  calculateAndDisplayRoute(
    directionsService,
    directionsDisplay,
    origin,
    destination
  ) {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    d = Math.round(d);
    d = d / 10000;
    console.log("distance--" + d);
    this.distancekm = d;
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  findHolt(from, to, mylat, mylng) {
    var distance = null;
    let usermapData = { lat: "", lng: "" };
    this.placeFind$ = this.aFDatabase.list("HoltList/" + [from] + "/" + [to]);
    this.placeFind$.subscribe((PlaceD: PlaceD[]) => {
      usermapData = PlaceD[0];
      

      distance = this.getDistanceFromLatLonInKm(
        usermapData.lat,
        usermapData.lng,
        mylat,
        mylng
      );
    });
  }
  findBusspead(from, to, mylat, mylng) {
    var distance = null;
    let usermapData = { lat: "", lng: "" };
    this.placeFind$ = this.aFDatabase.list("HoltList/" + [from] + "/" + [to]);
    this.placeFind$.subscribe((PlaceD: PlaceD[]) => {
      usermapData = PlaceD[0];

      distance = this.getDistanceFromLatLonInKm(usermapData.lat,usermapData.lng,mylat,mylng);
          this.speedOfBus = ((this.distancekm)/40)*60;
          
    });
  }
}
//AIzaSyDIjaO894zRzea75YQuuK5gSUzs84P-wNY
