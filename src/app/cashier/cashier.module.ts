import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowReservationsComponent } from './show-reservations/show-reservations.component';


const routes = [
  {path:'ShowReservations',component:ShowReservationsComponent}
]
@NgModule({
  declarations: [
    ShowReservationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule

  ]
})
export class CashierModule { }
