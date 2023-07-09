import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngridentsService {

  constructor(private http: HttpClient) { }
  getIngridents() {
    return this.http.get(`http://127.0.0.1:8000/api/ingredients`);
  }
  getIngridentByID(id: any) {
    return this.http.get(`http://127.0.0.1:8000/api/ingredients/${id}`);
  }
  addIngridents(body: any) {
    return this.http.post(`http://127.0.0.1:8000/api/ingredients`, body);
  }
  editIngridents(id: any, body: any) {
    return this.http.put(`http://127.0.0.1:8000/api/ingredients/${id}`, body);
  }
  deleteIngridents(id: any) {
    return this.http.delete(`http://127.0.0.1:8000/api/ingredients/${id}`);
  }
  ingridentsPagination(pageNumber: any) {
    return this.http.get(`http://127.0.0.1:8000/api/ingredients?page=${pageNumber}`);
  }
  ingridentsSearch(term: any) {
    return this.http.get(`http://127.0.0.1:8000/api/search/ingredient?keyword=${term}`);
  }
}
