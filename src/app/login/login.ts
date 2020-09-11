import { LoadingController, AlertController, MenuController } from '@ionic/angular';
import { ApiLoginService } from './../services/api-service/api-login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public loginService: ApiLoginService,
    public menuCtrl: MenuController
  ){    
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  
  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  async presentAlert(titulo, mensagem) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['Fechar']
    });
    await alert.present();
  }

  async onLogin(form: NgForm) {
    this.submitted = true
    if (form.valid) {
      const loading = await this.loadingController.create({message: 'Por favor, aguarde.'})
      await loading.present()
      this.loginService.login(this.login).then(
        data => {
          if (data.status) {
            this.router.navigate(['/personalizar'])
          } else {
            this.presentAlert("Erro", 'Por favor verifique se você digitou o email e senha corretamente.')
          }
        }
      ).catch((err) => {
        console.log("Erro", JSON.stringify(err))
        this.presentAlert("Erro", "Por favor, verifique se você está conectado à internet.")
      }).finally(() => loading.dismiss())
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
