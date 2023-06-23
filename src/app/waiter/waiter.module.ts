import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaiterProductListComponent } from './waiter-product-list/waiter-product-list.component';
import { WaiterProductItemComponent } from './waiter-product-item/waiter-product-item.component';
import { WaiterProductDetailComponent } from './waiter-product-detail/waiter-product-detail.component';



@NgModule({
  declarations: [
    WaiterProductListComponent,
    WaiterProductItemComponent,
    WaiterProductDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WaiterModule { }
