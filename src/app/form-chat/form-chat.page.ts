import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-form-chat',
  templateUrl: './form-chat.page.html',
  styleUrls: ['./form-chat.page.scss'],
})
export class FormChatPage implements OnInit {
  public Data:any;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService
  ) { this.getPayment()}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  handleRefresh(event:any) {
    setTimeout(() => {
      this.getPayment();
      event.target.complete();
    }, 2000);
  }

  async getPayment(){
    await this.storage['create']();
    this.storage['get']('isLoggedIn').then(async (val : any) => {
      if (val == null) {
        this.presentToast(
          "You're not logged in, please login !",
          'danger',
          'alert-circle-outline'
        );
        this.navCtrl.navigateRoot('/login');
      } else {
        let yearNow = (new Date()).getFullYear();
        this._apiService.getPayment(val.kk, String(yearNow), 'Lainnya').then((res) => {
          if (res?.msg == 'ok') {
            this.Data = res?.data;
            console.log(res?.data);
          }else if (res?.msg == 'notFound') {
            this.presentToast(
              'Belum ada transaksi !',
              'warning',
              'alert-circle-outline'
            );
          } else if (res?.msg == 'err') {
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

}