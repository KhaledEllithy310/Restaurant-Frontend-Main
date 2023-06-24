import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GetDataService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.displayPosts();
  }

  displayProduct() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
