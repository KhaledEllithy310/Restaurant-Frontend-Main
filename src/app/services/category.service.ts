import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get('http://127.0.0.1:8000/api/category');
  }

  getTable() {
    return this.http.get('http://127.0.0.1:8000/api/tables/');
  }



  AddCategory(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/category', data);
  }



  DeleteCategory(id: any) {
    return this.http.delete('http://127.0.0.1:8000/api/category/' + id);
  }

  UpdateCategory(data: any, id: any) {
    console.log(data.get('name'));
    return this.http.post('http://127.0.0.1:8000/api/category/' + id, data);
  }

  getOldCategory(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/category/' + id + '/edit');
  }
}
