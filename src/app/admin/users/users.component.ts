import { Component } from '@angular/core';
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

  constructor(private listusersService: UsersService, private router: Router) {}

  ngOnInit() {
    // this.listusersService
    //   .listUsers()
    //   .subscribe((res: any) => (this.users = res.data));
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
        // console.log(res, 'response');
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        // console.log(err.error.errors, 'errors');
      },
    });
  }

  getAllUesrs() {
    this.listusersService.userPagination(this.pageNumber).subscribe(
      (response: any) => {
        this.users = response.data;
        this.totalItems = response.total;
        this.pageSize = response.per_page;
  
        console.log(this.totalItems);
  
        console.log(response);
      },
      (error) => {
        console.log(error);
        // Handle error response
      }
    );
  }

  onPageChange(event: any) {
    // this.pageSize = event.pageSize;
    console.log(event);

    this.pageNumber = event;
    // this.pageNumber = event.page;
    this.getAllUesrs();
  }
}
