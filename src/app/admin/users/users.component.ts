import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: any;
  success!: string;
  errors: any = [];
  constructor(private listusersService: UsersService, private router: Router) {}


  ngOnInit() {
    this.listusersService.listUsers().subscribe((res: any) => this.users = res.data)
  }

  reload() {
    location.reload();
  }

  editUser(id: any) {
    this.router.navigate([`admin/users/edit/${id}`])
  }
  deleteUser(id: any) {
      this.users = this.users?.filter((author:any) => author.id != id);
      this.listusersService.deleteUserByID(id).subscribe({
        next: (res: any) => {
          this.success = res.message;
          console.log(res, "response")
        },
        error: (err: any) => {
          this.errors = err.error.errors;
          console.log(err.error.errors, "errors");
        }
        
      })
  }
}
