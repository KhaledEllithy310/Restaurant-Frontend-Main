import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router } from '@angular/router';
import { StorgeTokenService } from 'src/app/services/storge-token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  messageSuccess: boolean = false;
  loginForm!: FormGroup;
  errorsResponse: any = [];
  dataNotCorrect: boolean = false;
  responseData: any;
  token: any;
  userData: any;

  constructor(private loginService: RegisterService,
              private route: Router,
              private fb: FormBuilder,
              private storageService: StorgeTokenService) {}
  
  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.userData = this.storageService.getUser().user;
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)]]
    })
  }

  get registerForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const formDetails = {
      "email": this.loginForm.get('email')?.value,
      "password": this.loginForm.get('password')?.value
    }
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    });
    this.loginService.loginCustomer(formDetails, headers).subscribe({
      next: (res: any) => {
        this.responseData = res;
        this.storageService.saveUser(this.responseData)
        // this.userData = this.responseData.user;
        this.userData = this.storageService.getUser().user;
        console.log(this.userData);
        
        this.messageSuccess = true;
        this.dataNotCorrect = false;

        setTimeout(() => {
          this.route.navigate(['']);
        }, 3000);
      },
      error: (err: any) => {
        this.errorsResponse = err.error.errors;
        if(err.error.error == 'Unauthorized') {
          console.log(err.error.error);
          this.dataNotCorrect = true;
          this.messageSuccess = false;
        }
      }
    })
  }
}
