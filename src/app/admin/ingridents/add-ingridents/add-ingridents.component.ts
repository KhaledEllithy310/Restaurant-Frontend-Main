import {Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingrident } from 'src/app/interfaces/ingrident';
import { IngridentsService } from 'src/app/services/ingridents.service';
@Component({
  selector: 'app-add-ingridents',
  templateUrl: './add-ingridents.component.html',
  styleUrls: ['./add-ingridents.component.css'],
})
export class AddIngridentsComponent {

  // ingrident: Ingrident = {
  //   name: '', 
  //   price: 0, 
  //   profit: 0,
  //   quntity: 0
  // }

  ingridentForm!: FormGroup;
  success: any;
  errors: any = [];

  constructor(private addIngrident: IngridentsService, private fb: FormBuilder) {
    this.ingridentForm = this.fb.group({
      name: ['', [Validators.required]], 
      price: ['', [Validators.required]],
      profit: ['', [Validators.required, Validators.max(0.99)]],
      quntity: ['', [Validators.required]], 
    })
  }

  get ingForm() {
    return this.ingridentForm.controls;
  }

  submitForm() {
    const formData = new FormData();

    formData.append('name', this.ingridentForm.get('name')?.value);
    formData.append('price', this.ingridentForm.get('price')?.value);
    formData.append('profit', this.ingridentForm.get('profit')?.value);
    formData.append('quntity', this.ingridentForm.get('quntity')?.value);

    this.addIngrident.addIngridents(formData).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.errors = '';
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.success = '';
        console.log(err);
        
      }
    })
  }
  
}
