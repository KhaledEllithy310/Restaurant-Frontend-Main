import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts = new BehaviorSubject<any[]>([]);
  public cartContainer = this.cartProducts;
  private numberProductInCart = new BehaviorSubject(0);
  private totalPriceCart = new BehaviorSubject(0);

  constructor(private http: HttpClient) {}

  //STORE ITEM IN ARRAY OF CART {cartProducts}
  addToCart(productAdded: any) {
    // this.cartProducts.next([...this.cartProducts.value, productAdded]);
    this.cartProducts.next(this.cartProducts.value.concat(productAdded));
    // console.log(this.cartProducts);
  }

  // Display Cart Product
  getCartProducts() {
    return this.cartContainer.asObservable();
  }

  //Get NUmber Product from Cart
  getNumProductInCart() {
    return this.numberProductInCart.asObservable();
  }

  //Set NUmber Product in Cart
  setNumProductInCart(newVal: any) {
    this.numberProductInCart.next(newVal);
  }

  setTotalPrice(newVal: any) {
    this.totalPriceCart.next(newVal);
  }

  getTotalPrice() {
    return this.totalPriceCart.asObservable();
  }

  //***********************Api***********************//

  getAllCart() {
    return this.http.get(`http://127.0.0.1:8000/api/cart`);
  }

  AddToCart(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart`, data);
  }

  DeleteFromCart(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart`, data);
  }

  DeleteCart(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart`, data);
  }

  UpdateCart(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart`, data);
  }


  //customer cart


  getAllCartCustomer() {
    return this.http.get(`http://127.0.0.1:8000/api/cart/customer`);
  }

  AddToCartCustomer(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart/customer`, data);
  }

  DeleteFromCartCustomer(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart/customer`, data);
  }

  DeleteCartCustomer(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart/customer`, data);
  }

  UpdateCartCustomer(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/cart/customer`, data);
  }
}
