import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { GetDataService } from 'src/app/services/get-data.service';
// import { Product } from '../../interfaces';
@Component({
  selector: 'app-waiter-product-list',
  templateUrl: './waiter-product-list.component.html',
  styleUrls: ['./waiter-product-list.component.css'],
})
export class WaiterProductListComponent {
  products!: Array<any>;
  selectedProduct: any = null;

  constructor(
    private displayProductService: GetDataService,
    private cartservice: CartService
  ) {}
  ngOnInit() {
    this.displayProduct();
  }

  displayProduct() {
    this.displayProductService
      .displayProduct()
      .subscribe((res: any) => (this.products = res.recipes));
    // .subscribe((res: any) => console.log(res.recipes));
  }

  onProductSelected(product: any) {
    this.selectedProduct = product;
    // console.log(this.selectedProduct);
  }

  resetSelectedProduct() {
    this.selectedProduct = null;
  }

  addToCart(event: any) {
    console.log('4444');

    this.cartservice.addToCart(event);
  }
}
