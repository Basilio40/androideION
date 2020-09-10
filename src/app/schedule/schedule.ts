import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ApiLoginService } from './../services/api-service/api-login.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
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
    public loadingCtrl: LoadingController,
    public routerOutlet: IonRouterOutlet,
    public loginService: ApiLoginService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
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
    this.updateImoveis();
    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewWillEnter() {
    this.updateImoveis();
  }

  onLogout() {
    this.imoveis = []
  }

  updateImoveis() {
    this.imoveis = [];
    this.storage.get('user').then((dados) => {
      console.log("Dados do storage", dados)
      this.imoveis = JSON.parse(dados)['data']['imoveis']
      console.log(this.imoveis)
    })
  }
}
