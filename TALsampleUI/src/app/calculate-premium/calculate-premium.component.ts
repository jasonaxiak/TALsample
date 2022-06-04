import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { currenyRangeValidator } from '../shared/currency-range.validator';
import { CalculateAge, GetDobByAge } from '../shared/date-helper';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css']
})
export class CalculatePremiumComponent implements OnInit
{
  //Date range for DOB form input 
  public youngestDob: string;
  public oldestDob: string;

  //Premium calculator form
  public premiumCalculatorForm: FormGroup;

  constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) { }

  ngOnInit(): void {
    //Set max DOB range
    this.youngestDob = this.datePipe.transform(GetDobByAge(18), "yyyy-MM-dd") ?? "";
    this.oldestDob = this.datePipe.transform(GetDobByAge(90), "yyyy-MM-dd") ?? ""; 

    //Premium calculator form
    this.premiumCalculatorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required,Validators.min(18), Validators.max(90)]),
      dob: new FormControl("", [Validators.required]),
      occupation: new FormControl("", [Validators.required]),
      sumInsured: new FormControl("", [Validators.required, currenyRangeValidator(100000,1000000)])
    });

    //Set-up event to format currency value
    this.premiumCalculatorForm.valueChanges.subscribe(form => {
      if (form.sumInsured) {
        this.premiumCalculatorForm.patchValue({
          sumInsured: this.currencyPipe.transform(form.sumInsured.replace(/\D/g, '').replace(/^0+/, ''), '$','symbol','3.0-0')
          },
          { emitEvent: false });

        this.premiumCalculatorForm.controls.sumInsured.markAsTouched();
      }
    });
  }

  //Event handler to calculate and set age from provided DOB
  public updateAge(event: any) {
    var dob = new Date(event.target.value);

    this.premiumCalculatorForm.patchValue({
      age: CalculateAge(dob)
    },
    { emitEvent: false });
  }

  //Form Validation actions
  public validateControl = (controlName: string) => {
    return this.premiumCalculatorForm.controls[controlName].invalid &&
           this.premiumCalculatorForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.premiumCalculatorForm.controls[controlName].hasError(errorName);
  }

}
