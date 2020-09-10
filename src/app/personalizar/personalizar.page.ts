import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ApiLoginService } from '../../api-login.service';
import { MenuController, Animation, AnimationController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.page.html',
  styleUrls: ['./personalizar.page.scss'],
})

export class PersonalizarPage implements OnInit {

  constructor(private storage: Storage, public loginService: ApiLoginService,
    public menuCtrl: MenuController, public router: Router, private animationCtrl: AnimationController, private eRef: ElementRef, private navCtrl: NavController) { 
    loginService.loginEmitter$.subscribe(login => {
      login ? this.update() : this.onLogout()
    })
  }

  public dados: any
  imoveisProprietario: any
  imoveisInquilino: any

   
  @ViewChild("saudacao", {read: ElementRef, static: false}) saudacao : ElementRef;
  @ViewChild("txt", {read: ElementRef, static: false}) txt: ElementRef;
  @ViewChild("botoes", {read: ElementRef, static: false}) botoes: ElementRef;

  ngOnInit() {
    
    this.animate();
  }

  ionViewWillEnter(){
    this.update()
    this.menuCtrl.enable(false);
  }
  ionViewDidLeave() {
    this.menuCtrl.enable(true);

  }

  update() {
    this.dados = null;
    this.storage.get('user').then((dados) => {
      this.dados = JSON.parse(dados)
      this.imoveisInquilino = this.dados['data']['imoveis'].filter(x => !x.proprietario)
      this.imoveisProprietario = this.dados['data']['imoveis'].filter(x => x.proprietario)
      console.log(this.dados)
      console.log("Inquilino", this.imoveisInquilino)
      console.log("Proprietario", this.imoveisProprietario)
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
    }, 500);
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
    this.storage.set('user', JSON.stringify(this.dados)).then(() => {
      this.loginService.avisaLogin(true)
      this.router.navigate(['/app/tabs/schedule'])
    })
  }

  logout() {
    this.loginService.logout()
    return this.navCtrl.navigateRoot('/login');
  }

}
