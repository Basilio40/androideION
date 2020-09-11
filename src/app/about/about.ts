import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Component, ViewChild } from '@angular/core';
import { IonList, Config } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage {
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
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
    this.updateImoveis();

    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.updateImoveis();
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
  openWhats(url){
    const browser = this.iab.create("https://api.whatsapp.com/send?1=pt_BR&phone=5511940005753"+ encodeURIComponent(url), '_system')
  }
}
