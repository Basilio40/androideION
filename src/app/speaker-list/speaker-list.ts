import { ApiLoginService } from './../services/api-service/api-login.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, Config } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage implements OnInit {

  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  showSearchbar: boolean;
  groups: any = [];
  confDate: string;
  imoveis: any = [];

  constructor(
    public loginService: ApiLoginService,
    private iab: InAppBrowser,
    private storage: Storage,
    public router: Router,
    public config: Config
  ){
    loginService.loginEmitter$.subscribe(login => {
      console.log("AVISOU", login)
      login ? this.updateImoveis() : this.onLogout()
    })
  }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.updateImoveis();
  }

  onLogout() {
    this.imoveis = [];
  }

  updateImoveis() {
    this.imoveis = [];
    this.storage.get('user').then((dados) => {
      console.log("Dados do storage", dados)
      this.imoveis = dados['data']['imoveis']
      console.log(this.imoveis)
    })
  }

  openPDF(url){
    const browser = this.iab.create("https://docs.google.com/viewer?url=" + encodeURIComponent(url), '_system')
  }

}
