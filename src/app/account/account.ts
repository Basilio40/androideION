import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { ApiLoginService } from '../../api-login.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {

  constructor (private storage: Storage, public loginService: ApiLoginService) {

    loginService.loginEmitter$.subscribe(login => {
      console.log("AVISOU", login)
      login ? this.updateUser() : this.onLogout()
    })
  }

  dadosUsuario: any
  

  ngOnInit() {
    this.updateUser()
  }

  updateUser() {
    this.storage.get('user').then((dados) => {
      console.log("Dados do storage", dados)
      this.dadosUsuario = JSON.parse(dados)
      console.log(this.dadosUsuario)
    })
  }

  onLogout(){
    this.dadosUsuario = null
  }
}