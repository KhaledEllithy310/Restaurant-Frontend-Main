import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts = new BehaviorSubject<any[]>([]);
  private numberProductInCart = new BehaviorSubject(0);
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

  //Get NUmber Product from Cart
  getNumProductInCart() {
    return this.numberProductInCart.asObservable();
  }

  //Set NUmber Product in Cart
  setNumProductInCart(newVal: any) {
    this.numberProductInCart.next(newVal);
  }

  plusProduct(){


  }
}
