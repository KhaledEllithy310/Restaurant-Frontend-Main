import { CustomerService } from './../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NgbCalendar, NgbDatepickerConfig, NgbDateAdapter, NgbDateNativeAdapter , NgbDateStruct, NgbTimepickerModule, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AddReservationComponent {
  dates: string[] = [];
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;
  selectedDate: NgbDateStruct;
  message!:string
  time:NgbTimepickerModule = { hour: 12, minute: 0, second: 0 };

  formGroup = new FormGroup({
    dateControl: new FormControl('', Validators.required),
    timeControl : new FormControl('',Validators.required)
  });
  minTime: NgbTimepickerModule = { hour: 10, minute: 0,second:0  };
  maxTime: NgbTimepickerModule = { hour: 22, minute: 0,second:0 };

  dateValue:any;
  timeValue:any;

  constructor( private calendar: NgbCalendar, private router: ActivatedRoute, private customerService: CustomerService, private config: NgbDatepickerConfig) {

    this.selectedDate = { year: 2022, month: 1, day: 1 };
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
      this.selectedDate = this.minDate;
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
   console.log(    this.formGroup.value );
   this.dateValue = this.formGroup.controls.dateControl.value;
    this.timeValue = this.formGroup.controls.timeControl.value;
  this.dateValue.setHours(this.timeValue.hour);
  this.dateValue.setMinutes(this.timeValue.minute);
  this.dateValue.setSeconds(this.timeValue.second);

  const Removedate=this.dateValue.toISOString().slice(0, 10)

  this.dateValue=this.dateValue.toISOString().slice(0, 19).replace('T', ' ')

  // console.log(Removedate);
  this.formGroup.controls.dateControl.setValue('');
  const indexToRemove = this.dates.indexOf(Removedate);

if (indexToRemove !== -1) {
  this.dates.splice(indexToRemove, 1);
}

const data ={
  "start_date":this.dateValue,
  "customer_id":1,
  "table_id":this.router.snapshot.params['id']
}
// console.log(data['start_date'])
  this.customerService.makeReservation(data).subscribe((res:any)=>{
    console.log(res.message);

  });
  this.markDisabled = (date: NgbDateStruct) => !this.isDateSelectable(date);

  }
}
