import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  private itemsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}
 
  addTables(data: any):Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/tables/', data);
  }
  getTable() {
    return this.http.get('http://127.0.0.1:8000/api/tables/');
  }


  UpdateTable(data: any, id: any):Observable<any> {
    return this.http.put('http://127.0.0.1:8000/api/tables/' + id, data);
  }

  getOldTable(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/' + id);
  }

  change_status(id: any) {
    return this.http.get('http://127.0.0.1:8000/api/tables/status/' + id);
  }
}