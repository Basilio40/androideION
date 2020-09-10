import { AboutPageRoutingModule } from './about-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { AboutPage } from './about';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage],
  entryComponents: [],
  bootstrap: [AboutPage],
})
export class AboutModule {}

