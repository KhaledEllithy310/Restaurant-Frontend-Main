import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get('http://127.0.0.1:8000/api/products');
  }

  CreateProduct(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/products', data);
  }
  getIngredients(){
    return this.http.get('http://127.0.0.1:8000/api/ingredients');
  }
}
