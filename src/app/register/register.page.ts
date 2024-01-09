import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import axios from 'axios';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public nik: string = '';
  public email: string = '';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: Storage,
    private _apiService: ApiService

  ) {}

  async presentToast(msg: any, color: any, icon: any) {
    const toast = await this.toastCtrl.create({
      icon: icon,
      message: msg,
      duration: 2500,
      color: color,
      position: 'top',
    });
    toast.present();
  }

  async Insert() {
    if (this.nik == '' || this.email == '' || !this.nik.trim().length || !this.email.trim().length) {
      this.presentToast(
        'Tidak boleh ada form yang kosong, harap isi semua form!',
        'warning',
        'alert-circle-outline'
      );
    } else {
      const loader = await this.loadingCtrl.create({
        message: 'Tunggu Sebentar...',
        spinner: 'lines',
      });
      loader.present();
      try {
        let url = this._apiService.uriApi + 'penduduk?nik=' + this.nik;
        const res = await axios.get(url);
        if (res.data.status == 'Ok') {
          let data = res.data.result[0];
          if (data.status_huni == 'Aktif') {
            if (
              data.status_keluarga == 'Istri' ||
              data.status_keluarga == 'Kepala Keluarga'
            ) {
              try{
                const check = await axios.get(this._apiService.uriApi + 'user?nik=' + this.nik);
                if(check.data.status == 'Ok'){
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Akun sudah terdaftar !',
                    'warning',
                    'checkmark-circle-outline'
                  );
                } else {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Something went wrong !',
                    'danger',
                    'checkmark-circle-outline'
                  );
                }
              } catch(err){
                console.log(err.response.data.message)
                if(err.response.data.message == 'User not found'){
                  const formData = new FormData();
                  formData.append('nik', this.nik);
                  formData.append('email', this.email);
                  this._apiService.register(formData).then((res) =>  {
                    if (res?.msg == 'ok') {
                      this.loadingCtrl.dismiss();
                      this.presentToast( 
                        'Pendaftaran berhasil !',
                        'success',
                        'checkmark-circle-outline'
                      );
                      this.navCtrl.navigateBack('/login');
                    } else if (res?.msg == 'notOk') {
                      this.loadingCtrl.dismiss();
                      this.presentToast(
                        'Pendaftaran gagal !',
                        'danger',
                        'alert-circle-outline'
                      );
                    }else if (res?.msg == 'err') {
                      this.loadingCtrl.dismiss();
                      this.presentToast(
                        'Ada Sesuatu Yang Salah !',
                        'danger',
                        'alert-circle-outline'
                      );
                    }
                  });
                } else {
                  this.loadingCtrl.dismiss();
                  this.presentToast(
                    'Ada Sesuatu Yang Salah !',
                    'danger',
                    'alert-circle-outline'
                  );
                }
              }
            } else {
              this.loadingCtrl.dismiss();
              this.presentToast(
                'Akun tidak diperbolehkan mendaftar !',
                'warning',
                'checkmark-circle-outline'
              );
            }
          } else {
            this.loadingCtrl.dismiss();
            this.presentToast(
              'NIK tersebut sudah tidak aktif !',
              'warning',
              'checkmark-circle-outline'
            );
          }
        } else {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Akun tidak ditemukan !',
            'danger',
            'checkmark-circle-outline'
          );
        }
      } catch (err) {
        if(err.response.data.message == 'Penduduk not found'){
          this.loadingCtrl.dismiss();
          this.presentToast(
            'NIK belum terdaftar, hubungi RT untuk mendaftarkan diri !',
            'warning',
            'checkmark-circle-outline'
          );
        } else {
          this.loadingCtrl.dismiss();
          this.presentToast(
            'Ada Sesuatu Yang Salah!',
            'danger',
            'checkmark-circle-outline'
          );
        }
      }
    }
  }

  ngOnInit() {}
}