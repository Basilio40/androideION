import { MenuController, AnimationController, NavController } from '@ionic/angular';
import { ApiLoginService } from './../services/api-service/api-login.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.page.html',
  styleUrls: ['./personalizar.page.scss'],
})

export class PersonalizarPage implements OnInit {
   
  @ViewChild('saudacao', {read: ElementRef, static: false}) saudacao : ElementRef;
  @ViewChild('botoes', {read: ElementRef, static: false}) botoes: ElementRef;
  @ViewChild('txt', {read: ElementRef, static: false}) txt: ElementRef;

  imoveisProprietario: any;
  imoveisInquilino: any;
  dados: any;

  constructor(
    private animationCtrl: AnimationController, 
    private loginService: ApiLoginService,
    private menuCtrl: MenuController, 
    private navCtrl: NavController,
    private storage: Storage,
    private router: Router, 
  ){
    loginService.loginEmitter$.subscribe(login => {
      login ? this.update() : this.onLogout()
    });    
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    this.update();
  }

  ionViewWillEnter(){    
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.animate();      
    }, 111);
  }

  async update() {
    this.dados = null;
    await this.storage.get('user').then((dados) => {
      this.dados = dados;
      console.log('this.dados: ', this.dados);
      if(this.dados){
        this.imoveisInquilino = this.dados['data']['imoveis'].filter(x => !x.proprietario)
        this.imoveisProprietario = this.dados['data']['imoveis'].filter(x => x.proprietario)        
        console.log('Inquilino', this.imoveisInquilino)
        console.log('Proprietario', this.imoveisProprietario)
      }
    })
  }

  animate(){
    setTimeout(_ => {
      const anmA = this.animationCtrl.create()
      .addElement(this.saudacao.nativeElement).keyframes([
        { offset: 0, opacity: 0 },
        { offset: 0.3, opacity: 1},
        { offset: 0.6, opacity: 1},
        { offset: 1, opacity: 1}
      ]);
      const anmB = this.animationCtrl.create()
      .addElement(this.txt.nativeElement)
      .keyframes([
        { offset: 0, opacity: 0 },
        { offset: 0.3, opacity: 0},
        { offset: 0.6, opacity: 1},
        { offset: 1, opacity: 1}
      ]);
      const anmC = this.animationCtrl.create()
      .addElement(this.botoes.nativeElement)
      .keyframes([
        { offset: 0, opacity: 0 },
        { offset: 0.6, opacity: 0},
        { offset: 0.9, opacity: 1},
        { offset: 1, opacity: 1}
      ]);
      const parent = this.animationCtrl.create()
      .duration(5000)
      .iterations(1)
      .addAnimation([anmA, anmB, anmC]);
      parent.play()
    }, 333);
  }

  onLogout(){
    this.dados = [];
    this.imoveisInquilino = null;
    this.imoveisProprietario = null;
  }

  acessarInquilino(){
    this.dados['data']['imoveis'] = this.imoveisInquilino;
    this.acessarSistema();
  }

  acessarProprietario(){
    this.dados['data']['imoveis'] = this.imoveisProprietario;
    this.acessarSistema();
  }

  acessarSistema(){
    this.storage.set('user', this.dados).then(() => {
      this.loginService.avisaLogin(true)
      this.router.navigate(['/app/tabs/schedule'])
    })
  }

  logout() {
    this.loginService.logout()
    return this.navCtrl.navigateRoot('/login');
  }

}
