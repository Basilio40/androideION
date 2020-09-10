import { ApiLoginService } from './services/api-service/api-login.service';
import { MenuController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  appPages = [
    {
      title: 'Imoveis',
      url: '/app/tabs/schedule',
      icon: 'home'
    },
    {
      title: 'Documentos',
      url: '/app/tabs/speakers',
      icon: 'document'
    },
    {
      title: 'Pagamentos',
      url: '/app/tabs/map',
      icon: 'logo-usd'
    },
    {
      title: 'Chamado',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: "Informes",
      url: '/informes',
      icon: 'trending-up'
    }
  ];
  loggedIn = true;
  dark = true;

  constructor(
    public loginService: ApiLoginService,
    private splashScreen: SplashScreen,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private menu: MenuController,
    private statusBar: StatusBar,
    private platform: Platform,
    private storage: Storage,
    private router: Router,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      console.log("ativou login");
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.loginService.logout();
    return this.navCtrl.navigateRoot('/login');
  }
}
