import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetDataService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.displayPosts();
  }

  displayProduct() {
    return this.http.get(
      'https://forkify-api.herokuapp.com/api/search?q=salad'
    );
  }
  getCategory(){
    return this.http.get('http://127.0.0.1:8000/api/category');
  }
}
