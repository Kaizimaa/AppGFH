import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
  ModalController,
  ViewWillEnter
} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements ViewWillEnter {
  public Warga: any;

  constructor(
    private _apiService: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private storage: Storage,
    private alertCtrl : AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.getUser();
  }

  ionViewWillEnter(): void {
    try {
      this.getUser();
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

  async getUser() {
    await this.storage.create();
    this.storage.get('isLoggedIn').then(async (val) => {
      if (val == null) {
        this.presentToast(
          "Silahkan Melakukan Login Kembali !",
          'danger',
          'alert-circle-outline'
        );
        this.navCtrl.navigateRoot('/login');
      } else {
        const loader = await this.loadingCtrl.create({
          message: 'Tunggu Sebentar...',
          spinner: "lines",
        });
        loader.present();
        this._apiService.getWarga(val).then((res) => {
          if (res?.msg == 'ok') {
            this.Warga = Array(res?.data);
            loader.dismiss();
          } else if (res?.msg == 'notAcive') {
            loader.dismiss();
            this.presentToast(
              'Akun Ini Tidak Aktif !',
              'warning',
              'alert-circle-outline'
            );
            this.navCtrl.navigateRoot('/login');
          } else if (res?.msg == 'err') {
            loader.dismiss();
            this.presentToast(
              'Ada Sesuatu Yang Salah !',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  paymentRoute(route: string){
    this.navCtrl.navigateRoot([route]);
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
    }).then((confirm: { present: () => any; }) => confirm.present());
  }
}