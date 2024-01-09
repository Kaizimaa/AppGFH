import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tambah-data',
    loadChildren: () => import('./tambah-data/tambah-data.module').then( m => m.TambahDataPageModule)
  },
  {
    path: 'edit-data',
    loadChildren: () => import('./edit-data/edit-data.module').then( m => m.EditDataPageModule)
  },
  {
    path: 'form-kas',
    loadChildren: () => import('./form-kas/form-kas.module').then( m => m.FormKasPageModule)
  },
  {
    path: 'form-lainnya',
    loadChildren: () => import('./form-lainnya/form-lainnya.module').then( m => m.FormLainnyaPageModule)
  },
  {
    path: 'form-riwayat',
    loadChildren: () => import('./form-riwayat/form-riwayat.module').then( m => m.FormRiwayatPageModule)
  },
  {
    path: 'form-chat',
    loadChildren: () => import('./form-chat/form-chat.module').then( m => m.FormChatPageModule)
  },
  {
    path: 'edakun',
    loadChildren: () => import('./edakun/edakun.module').then( m => m.EdakunPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
