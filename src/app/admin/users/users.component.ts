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

  constructor(private listusersService: UsersService, private router: Router) {}


  ngOnInit() {
    this.listusersService.listUsers().subscribe((res: any) => this.users = res.data)
  }


  editUser(id: any) {
    this.router.navigate([`admin/users/edit/${id}`])
  }
  deleteUser(id: any) {
      this.users = this.users?.filter((author:any) => author.id != id);
  }
}