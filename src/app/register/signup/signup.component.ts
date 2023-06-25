import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  phoneNumber!: string;

  messageSuccess: boolean = false;

  signupForm!: FormGroup;

  constructor(private signupService: UsersService, private http: HttpClient, private fb: FormBuilder ) {}
  
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
      "username": this.username,
      "email": this.email,
      "password": this.password,
      "confirmPassword": this.confirmPassword,
      "phoneNumber": this.phoneNumber
    }
    console.log(formDetails);
    if(formDetails) {
      this.messageSuccess = true;
    }
  }
}