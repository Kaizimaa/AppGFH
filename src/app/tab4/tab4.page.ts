import { Component, OnInit } from '@angular/core';
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
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public Data: any;
  public msg: string = '';

  constructor(    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService) { }

  ngOnInit() {
    this.getPesan();
  }

  ionViewWillEnter(): void {
    try {
      this.getPesan();
    } catch (e) {
      throw new Error(e + 'Method not implemented.');
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPesan();
      event.target.complete();
    }, 2000);
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

  async getPesan(){
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
        this._apiService.getPesan(val.nik).then((res) => {
          if (res?.msg == 'ok') {
            this.Data = res?.data;
          } else if (res?.msg == 'Tidak Ditemukan') {
            this.Data = null;
            this.presentToast(
              'Belum ada pesan!',
              'warning',
              'alert-circle-outline'
            );
          }else if (res?.msg == 'err') {
            this.Data = null;
            this.presentToast(
              'Ada Kesalahan!',
              'danger',
              'alert-circle-outline'
            );
          }
        });
      }
    });
  }

  async send(){
    await this.storage.create();
    this.storage.get('isLoggedIn').then((val)=>{
      this._apiService.sendPesan(this.msg, val.nik).then((res) => {
        if (res.msg == 'ok') {
          this.getPesan();
          this.msg = '';
          this.presentToast(
            'Pesan berhasil dikirim!',
            'success',
            'checkmark-circle-outline'
          );
        } else if (res.msg == 'notOk') {
          this.msg = '';
          this.presentToast(
            'Pesan gagal dikirim!',
            'danger',
            'alert-circle-outline'
          );
        }else if (res.msg == 'err') {
          this.presentToast(
            'Something went wrong!',
            'danger',
            'alert-circle-outline'
          );
        }
      });
    })
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
