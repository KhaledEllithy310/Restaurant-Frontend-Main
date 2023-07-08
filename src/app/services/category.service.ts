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
    return this.http.get(`${this.URL}?page=${pageNumber}`);
  }
  getCategory() {
    return this.http.get(`${this.URL}`);
  }

  AddCategory(data: any) {
    return this.http.post(`${this.URL}`, data);
  }

  DeleteCategory(id: any) {
    return this.http.delete(`${this.URL}` + id);
  }

  UpdateCategory(data: any, id: any) {
    return this.http.post(`${this.URL}` + id, data);
  }

  getOldCategory(id: any) {
    return this.http.get(`${this.URL}` + id + '/edit');
  }

  onSearch(searchTerm: any) {
    return this.http.get(`${this.URL}/show?name=` + searchTerm);
  }
}
