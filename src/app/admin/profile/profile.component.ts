import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  errors: any = [];
  success!: string;
  editUserForm!: FormGroup;
  olduser: any = [];
  image!: File;
  
  constructor(private profileService: ProfileService, private fb: FormBuilder, private route: ActivatedRoute){
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], 
      role: ['', [Validators.required]],
      email: [null, [Validators.required, Validators.email]], 
      phone: [null, [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]] 
    })
  }
  
    ngOnInit() {
      this.profileService.getProfileData().subscribe((res: any) => this.olduser = res.data);
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
    const formData = new FormData();
    // formData['image'] =  this.image;
    formData.append('name', this.editUserForm.get('name')?.value);
    formData.append('email', this.editUserForm.get('email')?.value);
    formData.append('phone', this.editUserForm.get('phone')?.value);
    if(this.image){
      formData.append('image', this.image, this.image?.name)
    }
    formData.append('_method', 'put');
    

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    });
    console.log(this.olduser.id);
    this.profileService.updateProfileData(this.olduser.id, formData, headers).subscribe(
      {
      next: (res: any) => {
        this.success = res.message;
        console.log(res)
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        console.log(err);
      }
    }
    )

  }
}
