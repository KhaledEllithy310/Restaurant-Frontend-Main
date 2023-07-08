import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import Swal from 'sweetalert2';

@Injectable()
//   {
//   providedIn: 'root',
// }
export class ProductsService {
  private URL: string = environment.productBaseUrl;
  private IngredientsList = new BehaviorSubject<any[]>([]);
  private formStatus = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

  setFormStatus(newStatus: any) {
    this.formStatus.next(newStatus);
  }

  getFormStatus() {
    return this.formStatus.asObservable();
  }

  initializeIngredientList(ingredients: any[]) {
    this.IngredientsList.next([...ingredients]);
  }

  getIngredientsList() {
    return this.IngredientsList.asObservable();
  }

  addIngredient(newIngredient: any) {
    //get the current list of ingredients
    const currentList = this.IngredientsList.getValue();
    //check if the Ingredient already exist in array or not
    let IngredientExist = currentList.find(
      (Ingredient) => Ingredient.id == newIngredient.id
    );

    if (IngredientExist) {
      Swal.fire({
        icon: 'info',
        title: 'Ingredient already exists',
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      this.IngredientsList.next([...currentList, newIngredient]);
      Swal.fire({
        icon: 'success',
        title: 'Ingredient added successfully',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  setTargetIngredient(newIngredient: any) {
    //get the current list of ingredients
    const currentList = this.IngredientsList.getValue();
    this.IngredientsList.next([...currentList, newIngredient]);
  }

  deleteIngredient(idIngredient: any) {
    //get the current list of ingredients

    const currentList = this.IngredientsList.getValue();

    const modifiedList = currentList.filter(
      (ingredient) => ingredient.id !== idIngredient
    );
    return this.IngredientsList.next(modifiedList);
  }

  getProductPagination(pageNumber: number): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `http://127.0.0.1:8000/api/products?page=${pageNumber}`
    );
  }

  getAvailableProductPagination(pageNumber: number) {
    return this.http.get(
      `http://127.0.0.1:8000/api/active/product?page=${pageNumber}`
    );
  }

  getAllProduct() {
    return this.http.get(`http://127.0.0.1:8000/api/products/`);
  }

  getProductByCategoryPagination(id: any,pageNumber: number) {
    return this.http.get(`http://127.0.0.1:8000/api/products/category/` + id);
  }

  getProductById(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/products/` + id);
  }

  getIngredients() {
    return this.http.get('http://127.0.0.1:8000/api/ingredients');
  }

  updateIngredient(idIngredient: any, data: any) {
    return this.http.put(
      'http://127.0.0.1:8000/api/product/update/ingredients/' + idIngredient,
      data
    );
  }

  CreateProduct(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/products`, data);
  }

  UpdateProduct(idProduct: any, data: any) {
    return this.http.post(
      `http://127.0.0.1:8000/api/products/` + idProduct,
      data
    );
  }

  change_status(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/products/status/` + id);
  }

  onSearch(searchTerm: any) {
    return this.http.get(
      'http://127.0.0.1:8000/api/search/product?keyword=' + searchTerm
    );
  }
}
