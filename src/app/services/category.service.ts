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

  AddCategory(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/category', data);
  }

  DeleteCategory(id: any) {
    return this.http.delete('http://127.0.0.1:8000/api/category/' + id);
  }

  UpdateCategory(data: any, id: any) {
    return this.http.put('http://127.0.0.1:8000/api/category/' + id, data);
  }
}
