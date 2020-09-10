import { RouterModule, Routes } from '@angular/router';
import { SchedulePage } from './schedule';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulePageRoutingModule { }
