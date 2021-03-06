import { Page1 } from './../page1/page1';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class login {
    data : any;
    fetchdata : any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController , public navParams: NavParams, public alert : AlertController,private http : Http)
  {
    this.data = {};
    this.data.username = "";
    this.data.password = "";
    this.data.response = "";
  }

login(){
  let username = this.data.username;
  let password = this.data.password;


  console.log(username + " " + password);
  let data = JSON.stringify({username, password});

  //let link = "http://132.148.23.19/reports/js/login.php";
  let link = "http://localhost/reports/js/login.php";

  this.http.post(link,data)
  .map( res => res.json())
  .subscribe(
    data=>{
    this.fetchdata = data;
    console.log("Success");
  //  console.log(this.fetchdata);

    this.data.response = data._body;
       //console.log(data._body);

     console.log("Success11");
  //  console.log(this.fetchdata.usertype);


      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    if(this.fetchdata.usertype == "MD") {  this.navCtrl.setRoot(Page1);  }
    else { this.navCtrl.setRoot(login);}

  ///  this.fetchdata = data;
   // console.log("Success");
   //  console.log(this.fetchdata);
  },
  error=> { console.log("Error Here");}
  );



}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
