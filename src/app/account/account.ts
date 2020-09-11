import { ApiLoginService } from './../services/api-service/api-login.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {

  dadosUsuario: any

  constructor (
    private storage: Storage, 
    public loginService: ApiLoginService
  ){
    loginService.loginEmitter$.subscribe(login => {
      console.log("AVISOU", login)
      login ? this.updateUser() : this.onLogout()
    })
  }

  ngOnInit() {
    this.updateUser()
  }

  updateUser() {
    this.storage.get('user').then((dados) => {
      console.log("Dados do storage", dados)
      this.dadosUsuario = dados;
      console.log(this.dadosUsuario)
    })
  }

  onLogout(){
    this.dadosUsuario = null
  }
}