import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public router:Router,
    private alertCtrl:AlertController,
    private navCtrl:NavController,
    private storage: Storage) {}
  
  showkas(){
    this.router.navigateByUrl('/form-kas')
  }
  
  showlainnya(){
    this.router.navigateByUrl('/form-lainnya')
  }
  
  showhiskas(){
    this.router.navigateByUrl('/form-riwayat')
  }
  
  showeditakun(){
    this.router.navigateByUrl('/edakun')
  }
  showhisnya(){
    this.router.navigateByUrl('/form-chat')
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

