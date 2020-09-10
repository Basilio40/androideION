import { SpeakerListModule } from '../speaker-list/speaker-list.module';
import { TabsPageRoutingModule } from './tabs-page-routing.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { AboutModule } from '../about/about.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TabsPage } from './tabs-page';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    ScheduleModule,
    SpeakerListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
