import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  password!: string;
  email!: string;

  messageSuccess: boolean = false;
  loginForm!: FormGroup;

  constructor(private signupService: UsersService, private http: HttpClient, private fb: FormBuilder ) {}
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]],
      email: [null, [Validators.required, Validators.email]], 
    })
  }
  get registerForm() {
    return this.loginForm.controls;
  }

  onSubmit() {

    const formDetails = {
      "email": this.email,
      "password": this.password
    }
    console.log(formDetails);
    if(formDetails) {
      this.messageSuccess = true;
    }
  }
}