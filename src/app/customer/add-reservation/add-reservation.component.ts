import Swal from 'sweetalert2';
import { CustomerService } from './../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild} from '@angular/core';
import { NgbCalendar, NgbDatepickerConfig, NgbDateAdapter, NgbDateNativeAdapter , NgbDateStruct, NgbTimepickerModule, NgbTimeStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddReservationComponent {

  @ViewChild('datepicker') datepicker!: NgbDatepicker;
  dates: string[] = [];
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  minTime: NgbTimeStruct = { hour: 9, minute: 0, second: 0 };
  maxTime: NgbTimeStruct = { hour: 17, minute: 0, second: 0 };
  message!:string
  dateControl = new FormControl // Define dateControl property

  time:NgbTimepickerModule = { hour: 12, minute: 0, second: 0 };
  formGroup = new FormGroup({
    dateControl: new FormControl('', Validators.required),
    timeControl : new FormControl('',Validators.required)
  });

  dateValue:any;
  timeValue:any;
  datepickerDisabled = false;


constructor( private calendar: NgbCalendar, private router: ActivatedRoute,
   private customerService: CustomerService, private config: NgbDatepickerConfig, private navigateRoute:Router) {


    this.minDate =calendar.getToday();
    this.maxDate = calendar.getNext(calendar.getToday(), 'd',4);
    customerService.getAvailableTimeOnTable(router.snapshot.params['id']).subscribe((res: any) => {
      this.dates = res.data;
      console.log(res.data);

      if(!res.data[0])
      {
        this.message = "No Time Available in This Table "
      }else
      this.message="Free Time"
      // console.log(res.data)
      this.minDate = this.parseDateString(res.data.reduce((a: any, b: any) => a < b ? a : b));
      this.maxDate = this.parseDateString(res.data.reduce((a: any, b: any) => a > b ? a : b));
    });

    config.markDisabled = (date: NgbDateStruct) => !this.isDateSelectable(date);

  }

  formatDate(date: NgbDateStruct): string {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return jsDate.toLocaleDateString();
  }

  parseDateString(dateString: string): NgbDateStruct {
    const dateParts = dateString.split('-');
    return { year: Number(dateParts[0]), month: Number(dateParts[1]), day: Number(dateParts[2]) };
  }

  isDateSelectable(date: NgbDateStruct): boolean {
    const dateString = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    return this.dates.includes(dateString);
  }
  markDisabled = (date: NgbDateStruct) => !this.isDateSelectable(date);


  OnSubmit(){

  this.dateValue = this.formGroup.controls.dateControl.value;
  this.timeValue = this.formGroup.controls.timeControl.value;
  this.dateValue.setHours(this.timeValue.hour);
  this.dateValue.setMinutes(this.timeValue.minute);
  this.dateValue.setSeconds(this.timeValue.second);

  const Removedate=this.dateValue.toISOString().slice(0, 10)
  this.dateValue=this.dateValue.toISOString().slice(0, 19).replace('T', ' ')
  this.formGroup.controls.dateControl.setValue(null);

  const indexToRemove = this.dates.indexOf(Removedate);

if (indexToRemove !== -1) {
  this.dates.splice(indexToRemove, 1);
}
this.markDisabled = (date: NgbDateStruct) => !this.isDateSelectable(date);


const data ={
  "start_date":this.dateValue,
  "table_id":this.router.snapshot.params['id']
}
Swal.fire({
  title: 'Do you Want to Make Your Meal ? ',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes',
  cancelButtonText: 'No , i want my Reservation Only',
}).then((result) => {
  if (result.isConfirmed) {
    this.addToLocalStorage(data);
    this.navigateRoute.navigate(["customer/MakeOrder"])
  } else {
     this.customerService.makeReservation(data).subscribe((res:any)=>{
    Swal.fire({
      title: 'Make Reservation',
      text: res.message,
      icon: 'success'
    });
  })
  }
});

  // });
  this.formGroup.get('dateControl')?.setValue(null);
  this.formGroup.get('dateControl')?.reset();
  this.formGroup.reset();

  }

  addToLocalStorage(data:any)
  {
const expirationTime = new Date().getTime() + 60 * 60 * 1000;

const item = { value: data, expiration: expirationTime };

const itemString = JSON.stringify(item);

localStorage.setItem('Reservation_Info', itemString);
  }



}
