import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {


  public dadosUsuario: any;
  public loginEmitter$: EventEmitter<Boolean>

  constructor(private http: HttpClient, private storage: Storage) {
    this.loginEmitter$ = new EventEmitter()
  }


  avisaLogin(t) {
    this.loginEmitter$.emit(t)
  }


  login(data) : Promise<any> {
    return (new Promise((resolve, reject) => {
      this.http.post('https://api-mobile.spaic.com.br/login', data).toPromise()
      .then((dados: any) => {
        console.log("Resposta", dados)
        if (dados.status) {
          console.log(this.dadosUsuario)
          this.dadosUsuario = dados
          console.log(this.dadosUsuario)
          this.storage.set('user', this.dadosUsuario).then(() => this.avisaLogin(true))
        }
        resolve(dados)
      })
      .catch((err) => reject(err))
    }))
  }

  logout() {
    this.storage.clear();
    this.storage.set('user', '').then(() => this.avisaLogin(false))
  }

}
