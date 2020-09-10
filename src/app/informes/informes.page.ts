import { ApiLoginService } from './../services/api-service/api-login.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Config, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-informes',
  templateUrl: 'informes.page.html',
  styleUrls: ['./informes.page.scss']
})
export class InformesPage implements OnInit {
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
  informes: any = [];

  constructor(
    public loginService: ApiLoginService,
    private iab: InAppBrowser,
    private storage: Storage,
    public config: Config,
    public router: Router
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
    this.informes = [];
  }

  updateImoveis() {
    this.informes = [];
    this.storage.get('user').then((dados) => {
      console.log("Dados do storage", dados)
      this.informes = JSON.parse(dados)['data']['informes']
      console.log(this.informes)
    })
  }

  openPDF(url){
    const browser = this.iab.create("https://docs.google.com/viewer?url=" + encodeURIComponent(url), '_system')
  }
}

