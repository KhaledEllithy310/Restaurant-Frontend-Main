import { CartService } from 'src/app/services/cart.service';
import { GetDataService } from 'src/app/services/get-data.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() item: any = {};
  // productSelected: any = {};
  products!: any;
  @Output() productSelected = new EventEmitter<any>();
  @Output() item_card = new EventEmitter<any>();
  constructor(
    private displayProductService: GetDataService,
    private cartservice: CartService
  ) {}
  ngOnInit(): void {
    // console.log('Product:', this.item);
    // this.displayProduct();
  }

  // displayProduct() {
  //   this.displayProductService
  //     .displayProduct()
  //     .subscribe((res) => (this.products = res));
  // }

  getProductDetail(item: any) {
    this.productSelected.emit(item);
    // console.log(item);
  }

  add(productSelected: any) {
    this.item_card.emit(productSelected);
    console.log(productSelected.id);
  }
}
