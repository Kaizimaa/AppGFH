import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public Data: any;
  public kk: string = '';

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private route: Router,
    private storage: Storage,
    private alertCtrl : AlertController,
    private _apiService: ApiService
  ) {
    this.getKK();
  }

  ionViewWillEnter() {
    this.getKK();
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

  async getKK() {
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
          spinner: "lines",
        });
        loader.present();
        this._apiService.getKK(val).then((res) => {
          if (res.msg == 'ok') {
            this.Data = res.data;
            this.kk = String(res.data[0].kk);
            loader.dismiss();
          } else if (res.msg == 'err') {
            loader.dismiss();
            this.presentToast(
              'Something went wrong:' + String(res.err),
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
    }).then((confirm : any) => confirm.present());
  }


  isReadOnly() {
    return this.isReadOnly;
  }

  tambah() {
    this.route.navigateByUrl('/tambah-data?kk=' + this.kk);
  }

  editKK(nik: string) {
    if (nik && nik.trim() !== '')
    this.route.navigateByUrl('/edit-data?nik=' + nik);
  }
  ngOnInit() {
    
  }
}
