import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import{Table} from '../interfaces/table';
import { Fortables } from '../interfaces/fortables';
@Injectable(
  {
  providedIn: 'root',
}
)
export class TablesService {
  private URL: string = environment.tableBaseUrl;
  constructor(private http: HttpClient) {}

  getTablePagination(pageNumber: number): Observable<Array<Fortables>> {
    return this.http.get<Array<Fortables>>(`${this.URL}?page=${pageNumber}`);
  }

  addTables(data: any):Observable<any> {
    return this.http.post(`${this.URL}`, data);
  }
  getTable() {
    return this.http.get(`${this.URL}`);
  }


  UpdateTable(data: any, id: any):Observable<any> {
    return this.http.put(`${this.URL}` + id, data);
  }

  getOldTable(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/' + id);
  }

  //Get Available Table For Waiter
  getAvailableTable() {
    return this.http.get('http://127.0.0.1:8000/api/tables/available/inday');
  }

  getActiveTable()
  {
    return this.http.get('http://127.0.0.1:8000/api/tables/available');

  }



  change_status(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/status/' + id);
  }
  // getAllTABLE() {
  //   return this.http.get(`${this.URL}`);
  // }
}
