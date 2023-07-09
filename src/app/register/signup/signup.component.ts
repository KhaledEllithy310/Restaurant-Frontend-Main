import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { RegisterService } from 'src/app/services/register.service';
import { UsersService } from 'src/app/services/users.service';
import { userValidators } from '../validators/user-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  messageSuccess: boolean = false;

  signupForm!: FormGroup;
  successResponse: any;
  errorsResponse: any = [];

  constructor(private signupService: RegisterService, private route: Router, private fb: FormBuilder ) {}
  
  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]],
      confirmPassword: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]], 
      phoneNumber: [null, [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]] 
  })
  }
  get registerForm() {
    return this.signupForm.controls;
  }
  
  confirm() {
    return this.signupForm.get('password')?.value !== this.signupForm.get('confirmPassword')?.value;
  }

  onSubmit() {

    const formDetails = {
      "name": this.signupForm.get('username')?.value,
      "email": this.signupForm.get('email')?.value,
      "password": this.signupForm.get('password')?.value,
      "phone": this.signupForm.get('phoneNumber')?.value
    }
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    });
    console.log(formDetails);

    this.signupService.registerCustomer(formDetails, headers).subscribe({
      next: (res: any) => {
        this.successResponse = res.message;
        this.errorsResponse = '';
        // console.log(res);
        setTimeout(() => {
          this.route.navigate(['register/login']);
        }, 3000);
      },
      error: (err: any) => {
        this.errorsResponse = err.error.errors;
        console.log(err);
      }
    })
  }
}