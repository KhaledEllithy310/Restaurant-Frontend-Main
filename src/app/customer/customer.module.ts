import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesComponent } from './tables/tables.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { NgbDateAdapter, NgbModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MyReservationComponent } from './my-reservation/my-reservation.component';


const routes = [
  {path:'tablesForbook',component:TablesComponent},
  {path:'MakeReservation/:id',component:AddReservationComponent},
  {path:'MyReservations',component:MyReservationComponent}
]
@NgModule({
  declarations: [
    TablesComponent,
    AddReservationComponent,
    MyReservationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbTimepickerModule


  ],
  providers:[
    {provide: NgbDateAdapter, useClass: AddReservationComponent},
  ]

})
export class CustomerModule { }
