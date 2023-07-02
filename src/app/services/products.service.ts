import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // getProduct() {
  //   return this.http.get('http://127.0.0.1:8000/api/products');
  // }
  getProduct(pageNumber: number, pageSize: number) {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('per_page', pageSize.toString());
    return this.http.get('http://127.0.0.1:8000/api/products', { params });
  }

  getIngredients() {
    return this.http.get('http://127.0.0.1:8000/api/ingredients');
  }

  CreateProduct(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/products', data);
  }
}
