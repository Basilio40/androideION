import { SchedulePageRoutingModule } from './schedule-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SchedulePage } from './schedule';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePageRoutingModule,
    IonicStorageModule,
  ],
  declarations: [
    SchedulePage
  ],
  entryComponents: [
  ]
})
export class ScheduleModule { }
