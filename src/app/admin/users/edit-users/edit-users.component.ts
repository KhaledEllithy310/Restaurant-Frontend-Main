import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})

export class EditUsersComponent {

  user: any;
  id: any;
  constructor(private getUsers: UsersService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUsers.getUserByID(this.id).subscribe((res: any) => this.user = res)
  }

}
