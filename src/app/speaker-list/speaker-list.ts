import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, Config } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiLoginService } from '../../api-login.service';

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
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  imoveis: any = [];

  constructor(
    public router: Router,
    public config: Config,
    private storage: Storage,
    private iab: InAppBrowser,
    public loginService: ApiLoginService
  ) { 
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
      this.imoveis = JSON.parse(dados)['data']['imoveis']
      console.log(this.imoveis)
    })
  }

  openPDF(url){
    const browser = this.iab.create("https://docs.google.com/viewer?url=" + encodeURIComponent(url), '_system')
  }

}
