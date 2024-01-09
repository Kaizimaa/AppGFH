import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public Data: any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService,
    private alertCtrl : AlertController
  ) {
    this.getInfo();
  }

  ionViewWillEnter(): void {
    try {
      this.getInfo();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 1500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async getInfo(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then(async (val) => {
      if (val == null) {
        this.presentToast(
          "You're not logged in, please login !",
          'danger',
          'alert-circle-outline'
        );
        this.navCtrl.navigateRoot('/login');
      } else {
        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
          spinner: 'lines',
        });
        loader.present();
        this._apiService.getInfo().then((res) => {
          if (res?.msg == 'ok') {
            this.Data = res?.data;
            loader.dismiss();
          } else if (res?.msg == 'notFound') {
            loader.dismiss();
            this.presentToast(
              'Belum ada info !',
              'warning',
              'alert-circle-outline'
            );
          }else if (res?.msg == 'err') {
            loader.dismiss();
            this.presentToast(
              'Something went wrong',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  async confirmLogout() {
    this.storage.remove('isLoggedIn');
    localStorage.removeItem('isLoggedIn');
    this.alertCtrl.create({
      header: 'Keluar?',
      message: 'Apakah kamu yakin?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    }).then(confirm => confirm.present());
  }




  handleRefresh(event:any) {
    setTimeout(() => {
      this.getInfo();
      event.target.complete();
    },  2000);
  }
}
