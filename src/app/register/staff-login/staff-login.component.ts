import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { StorgeTokenService } from 'src/app/services/storge-token.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent {
  messageSuccess: boolean = false;
  loginForm!: FormGroup;
  errorsResponse: any = [];
  dataNotCorrect: boolean = false;
  responseData: any;
  token: any;
  userData: any;

  constructor(private loginStaffService: RegisterService,
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

    this.loginStaffService.loginStaff(formDetails, headers).subscribe({
      next: (res: any) => {
        this.responseData = res;
        this.storageService.saveUser(this.responseData)
        
        this.userData = this.storageService.getUser().user;
        this.messageSuccess = true;
        this.dataNotCorrect = false;

        switch(this.userData.role) {
          case 'Admin':
            console.log('admin')
            setTimeout(() => {
              this.route.navigate(['/admin/dashboard/statistcs']);
            }, 3000);
            break;
          case 'Waiter':
            console.log('waiter');
            setTimeout(() => {
              this.route.navigate(['/Waiter/ProductList']);
            }, 3000);
            
            break;
          case 'Cashair':
            console.log('cashair');
            setTimeout(() => {
              this.route.navigate(['/cashier/ShowReservations']);
            }, 3000);
            
            break;
            case 'Kitchen':
              console.log('kitchen')
              setTimeout(() => {
                this.route.navigate(['kitchen']);
              }, 3000);
              break;
              default:
                console.log('not staff');
                this.route.navigate(['/home']);
                break;
        }
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
