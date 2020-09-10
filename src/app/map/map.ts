import { ApiLoginService } from './../services/api-service/api-login.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Config, IonList } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements OnInit {
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
  imoveis: any = [] = [];
  extratos: any = [] = [];
  imoveisInquilino : boolean=false;
  imoveisProprietario : boolean=false;

  constructor(
    public loginService: ApiLoginService,
    private iab: InAppBrowser,
    private storage: Storage,
    public config: Config,
    public router: Router
  ){
    loginService.loginEmitter$.subscribe(login => {
      //console.log("AVISOU", login)
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
    this.storage.get('user').then((dados) => {
      this.imoveis = JSON.parse(dados)['data']['imoveis'];
      this.extratos = JSON.parse(dados)['data']['extratos']; 
    })
  }

  openPDF(url){
   const browser = this.iab.create("https://docs.google.com/viewer?url=" + encodeURIComponent(url), '_system');
  }
}

