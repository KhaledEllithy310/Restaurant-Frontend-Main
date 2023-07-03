import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private http: HttpClient) {}

  addTables(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/tables/', data);
  }
  getTable() {
    return this.http.get('http://127.0.0.1:8000/api/tables/');
  }

  // AddCategory(data: any) {
  //   return this.http.post('http://127.0.0.1:8000/api/category', data);
  // }

  UpdateTable(data: any, id: any) {
    return this.http.put('http://127.0.0.1:8000/api/tables/' + id, data);
  }

  getOldTable(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/' + id);
  }

  change_status(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/status/' + id);
  }
}