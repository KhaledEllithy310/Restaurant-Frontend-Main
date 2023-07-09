import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KitchenService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get(`http://127.0.0.1:8000/api/orders/prepare`);
  }
  completed(orderId: any, orderProdutId: any) {
    return this.http.put(
      `http://127.0.0.1:8000/api/order_products/${orderId}/complete/${orderProdutId}`,
      {}
    );
  }
  canceled(orderId: any, orderProdutId: any) {
    return this.http.put(
      `http://127.0.0.1:8000/api/order_products/${orderId}/cancel/${orderProdutId}`,
      {}
    );
  }
  completeOrder(orderId: any) {
    return this.http.put(
      `http://127.0.0.1:8000/api/orders/kitchen/${orderId}`,
      {}
    );
  }
}
