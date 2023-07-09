import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
//   {
//   providedIn: 'root',
// }
export class CategoryService {
  private URL: string = environment.categoryBaseUrl;

  constructor(private http: HttpClient) {}

  getCategoryPagination(pageNumber: number) {
    return this.http.get(
      `http://127.0.0.1:8000/api/category?page=${pageNumber}`
    );
  }
  getCategory() {
    return this.http.get(`http://127.0.0.1:8000/api/category`);
  }

  AddCategory(data: any) {
    return this.http.post(`http://127.0.0.1:8000/api/category`, data);
  }

  DeleteCategory(id: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/category/` + id);
  }

  UpdateCategory(data: any, id: any) {
    return this.http.post(`http://127.0.0.1:8000/api/category/` + id, data);
  }

  getOldCategory(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/category/` + id + '/edit');
  }

  onSearch(searchTerm: any) {
    return this.http.get(
      `http://127.0.0.1:8000/api/category/show?name=` + searchTerm
    );
  }
  openStatusCategory(id: any, data: any) {
    return this.http.post(
      `http://127.0.0.1:8000/api/category/` + id + `/status`,
      data
    );
  }
}
