import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products.component';
import { DisplayProductsComponent } from './display-products/display-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products.service';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryService } from 'src/app/services/category.service';
import { AddSubIngredientComponent } from './add-sub-ingredient/add-sub-ingredient.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'display', component: DisplayProductsComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
];

@NgModule({
  declarations: [
    DisplayProductsComponent,
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,
    AddSubIngredientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule,
    NgbModule,
  ],
  exports: [
    DisplayProductsComponent,
    ProductsComponent,
    AddProductComponent,
    ProductDetailsComponent,
  ],
  providers: [ProductsService, CategoryService],
})
export class ProductsModule {}
