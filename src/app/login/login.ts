import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { ApiLoginService } from './../services/api-service/api-login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage{
  login = { email: '', senha: '' };
  submitted = false;

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public loginService: ApiLoginService,
    public menuCtrl: MenuController,
    private storage: Storage,
    public router: Router
  ){    
  }

  ngOnInit() {
    this.isLoggedIn();
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  async onLogin(form: NgForm) {
    this.submitted = true
    if (form.valid) {
      const loading = await this.loadingController.create({
        message: 'Por favor, aguarde.',
        cssClass:'custom-loader-class',
      })
      await loading.present()
      this.loginService.login(this.login).then(
        data => {
          if (data.status) {
            this.storage.set('userData', this.login.email);
            this.router.navigate(['/personalizar']);
          } else {
            this.presentAlert("Erro", 'Por favor, verifique o CPF é inválido.');
            this.router.navigate(['/login']);
          }
        }
      ).catch((err) => {
        console.log("Erro", JSON.stringify(err))
        this.presentAlert("Erro", "Por favor, verifique se você está conectado à internet.");
      }).finally(() => loading.dismiss())
    }
  }

  async presentAlert(titulo, mensagem) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['Fechar']
    });
    await alert.present();
  }

  isLoggedIn() {
    this.storage.get('userData').then((data)=>{
      if (data!=undefined) {
        this.router.navigate(['/personalizar']);
      } else {
        this.router.navigate(['/login']);
      }
      console.log('IsLoggedIn: ', data);
    });
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
