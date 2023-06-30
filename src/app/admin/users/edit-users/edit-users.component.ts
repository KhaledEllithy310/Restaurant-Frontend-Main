import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { User, UserRole } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})

export class EditUsersComponent {


  errors: any = [];
  success!: string;
  editUserForm!: FormGroup;
  olduser!: User;
  image: any;
  id: any;
  
  constructor(private userService: UsersService, private fb: FormBuilder, private route: ActivatedRoute){
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]],
      role: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]], 
      phone: [null, [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]] 
    })
  }
  
    ngOnInit() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.userService.getUserByID(this.id).subscribe((res: any) => this.olduser = res.data)
    }


  get registerForm() {
    return this.editUserForm.controls;
  }

  onFileSelected(event: any){
    const file = event.target.files[0];
    if (file) {
      this.image = file;
    }
  }

  submitForm() {
    const formData = this.editUserForm.value
    formData['image'] =  this.image;
    formData['_method'] = 'put';
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    this.userService.editUserByID(this.id, formData, headers).subscribe(
      {
      next: (res: any) => {
        this.success = res.message;
        console.log(res, "response")
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        console.log(err.error.errors, "errors");
      }
    }
    )

  }

}
