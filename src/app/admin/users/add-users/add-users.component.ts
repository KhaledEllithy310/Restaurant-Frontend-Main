import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent {
  user: User = {
    name: '',
    password: '',
    email: '',
    role: UserRole.Admin,
    phone: '',
  };
  errors: any = [];
  success!: string;
  addUserForm!: FormGroup;

  constructor(private addUserService: UsersService, private fb: FormBuilder) {}

  ngOnInit() {
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/),
        ],
      ],
      role: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)],
      ],
    });
  }

  get registerForm() {
    return this.addUserForm.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.image = file;
    }
  }

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('password', this.user.password);
    formData.append('email', this.user.email);
    formData.append('role', this.user.role);
    if (this.user.image) {
      formData.append('image', this.user.image, this.user.image?.name);
    }
    formData.append('phone', this.user.phone);
    // console.log(formData);
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    });

    this.addUserService.addUser(formData, headers).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.errors = '';
        // console.log(res, 'response');
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.success = '';
        // console.log(err.error.errors, 'errors');
      },
    });
  }
}
