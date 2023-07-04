import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { CartService } from '../services/cart.service';
import { WaiterComponent } from './waiter.component';
import { WaiterProductListComponent } from './waiter-product/waiter-product-list/waiter-product-list.component';
import { WaiterProductItemComponent } from './waiter-product/waiter-product-item/waiter-product-item.component';
import { WaiterProductDetailComponent } from './waiter-product/waiter-product-detail/waiter-product-detail.component';
import { WaiterCartComponent } from './waiter-cart/waiter-cart.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'ProductList',
    component: WaiterComponent,
  },
  {
    path: 'ProductDetail',
    component: WaiterProductDetailComponent,
  },
  {
    path: 'ProductItem',
    component: WaiterProductItemComponent,
  },
];

@NgModule({
  declarations: [
    WaiterProductListComponent,
    WaiterProductItemComponent,
    WaiterProductDetailComponent,
    WaiterComponent,
    WaiterCartComponent,
    ModalComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  providers: [GetDataService, CartService],
  exports: [ModalComponent],
})
export class WaiterModule {}
