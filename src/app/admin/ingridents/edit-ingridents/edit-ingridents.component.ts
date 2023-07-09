import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IngridentsService } from 'src/app/services/ingridents.service';

@Component({
  selector: 'app-edit-ingridents',
  templateUrl: './edit-ingridents.component.html',
  styleUrls: ['./edit-ingridents.component.css']
})
export class EditIngridentsComponent {
  
  editingridentForm!: FormGroup;
  
  oldIngrident: any = [];

  id: any;
  success: any;
  errors: any = [];

  constructor(private editIngrident: IngridentsService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.editingridentForm = this.fb.group({
      name: ['', [Validators.required]], 
      price: ['', [Validators.required]],
      profit: ['', [Validators.required, Validators.max(0.99)]],
      quntity: ['', [Validators.required], Validators.min(0)], 
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editIngrident.getIngridentByID(this.id).subscribe((res: any) => this.oldIngrident = res.data)
  }

  get ingForm() {
    return this.editingridentForm.controls;
  }

  submitForm() {
    const formObj = {
      'name': this.editingridentForm.get('name')?.value,
      'price': this.editingridentForm.get('price')?.value,
      'profit': this.editingridentForm.get('profit')?.value,
      'quntity': this.editingridentForm.get('quntity')?.value
    }

    console.log(formObj);
    console.log(this.id);
  
    this.editIngrident.editIngridents(this.id, formObj).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.errors = '';
        console.log(res);
      },
      error: (err: any) => {
        this.errors = err.error.errors;
        this.success = '';
        console.log(err);
        
      }
    })
  }
}
