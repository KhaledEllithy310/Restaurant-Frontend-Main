import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {

  pageSize = 8;
  pageNumber = 1;
  totalItems = 0;
  users: any;
  success!: string;
  errors: any = [];
  
  searchForm!: FormGroup;
  searchTerm: string = '';


  constructor(private listusersService: UsersService, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: '',
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe(
      (term: string) => {
        this.search(term);
      })

    this.getAllUesrs()
  }

  reload() {
    location.reload();
  }

  editUser(id: any) {
    this.router.navigate([`admin/dashboard/users/edit/${id}`]);
  }

  deleteUser(id: any) {
    this.users = this.users?.filter((user: any) => user.id != id);
    this.listusersService.deleteUserByID(id).subscribe({
      next: (res: any) => {
        this.success = res.message;
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
      },
    });
  }

  getAllUesrs() {
    this.listusersService.userPagination(this.pageNumber).subscribe({
      next: (res: any) => {
          this.users = res.data;
          this.totalItems = res.meta.total;
          this.pageSize = res.meta.per_page;
          console.log(this.totalItems);
          console.log(res);
      },
      error: (err: any) => {
        this.errors = err;
      }});
    }

  onPageChange(event: any) {
    this.pageNumber = event;
    this.getAllUesrs();
  }

  search(term: string) {
    this.listusersService.onSearch(term).subscribe({
      next: (res: any) => {
          this.users = res.data;
          console.log(res);
      },
      error: (err: any) => {
        this.users = err.error.data;
        console.log(err);
      }}
    );
  }

}
