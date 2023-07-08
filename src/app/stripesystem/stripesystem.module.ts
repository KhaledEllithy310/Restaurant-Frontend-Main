import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './checkout/checkout.component';
import { StripesystemComponent } from './stripesystem.component';


const routes: Routes = [
  { path: 'payment', component: StripesystemComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    CommonModule,
    NgbModule
  ],
  providers: [],
  exports: [CheckoutComponent],
})

export class StripesystemModule { }

