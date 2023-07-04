import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable(
//   {
//   providedIn: 'root',
// }
)
export class ProductsService {
  private URL: string = environment.productBaseUrl;
  constructor(private http: HttpClient) {}

  getProductPagination(pageNumber: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.URL}?page=${pageNumber}`);
  }
  getAllProduct() {
    return this.http.get(`${this.URL}`);
  }

  getIngredients() {
    return this.http.get('http://127.0.0.1:8000/api/ingredients');
  }

  CreateProduct(data: any) {
    return this.http.post(`${this.URL}`, data);
  }

  change_status(id: any) {
    return this.http.get(`${this.URL}/status/` + id);
  }

  onSearch(searchTerm: any) {
    return this.http.get(
      'http://127.0.0.1:8000/api/search/product?keyword=' + searchTerm
    );
  }
}
