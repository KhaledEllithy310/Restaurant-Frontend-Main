import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts = new BehaviorSubject<any[]>([]);
  constructor() {}

  //STORE ITEM IN ARRAY OF CART {cartProducts}
  addToCart(productAdded: any) {
    // this.cartProducts.next([...this.cartProducts.value, productAdded]);
    this.cartProducts.next(this.cartProducts.value.concat(productAdded));
    // console.log(this.cartProducts);
  }

  // Display Cart Product
  getCartProducts() {
    return this.cartProducts.asObservable();
  }
}
