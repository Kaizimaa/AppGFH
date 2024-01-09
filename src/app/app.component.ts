import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController, Platform, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [Storage],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  // async confirmLogout() {
  //   this.alertCtrl.create({
  //     header: 'Keluar?',
  //     message: 'Apakah kamu yakin?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           console.log('No clicked');
  //         }
  //       },
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.navCtrl.navigateRoot('login');
  //         }
  //       }
  //     ]
  //   }).then(confirm => confirm.present());
  // }

  async initializeApp() {
  await this.storage.create();
  this.platform.ready().then(() => {

  })

  this.storage.get('isLoggedIn').then((val) => {
    if (val === null|| val === undefined || val === '' ){
      this.navCtrl.navigateRoot('/splash');
    } else {
      this.navCtrl.navigateRoot('/tabs/tab1');
    }
  });
    }
  }
