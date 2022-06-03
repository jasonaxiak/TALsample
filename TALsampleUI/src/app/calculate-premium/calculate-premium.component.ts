import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css']
})
export class CalculatePremiumComponent implements OnInit
{
  public premiumCalculatorForm: FormGroup;

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.premiumCalculatorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required,Validators.min(18), Validators.max(90)]),
      dob: new FormControl("", [Validators.required]),
      occupation: new FormControl("", [Validators.required]),
      sumInsured: new FormControl("", [Validators.required, Validators.min(100000), Validators.max(1000000)])
    });

    this.premiumCalculatorForm.valueChanges.subscribe(form => {
      if (form.sumInsured) {
        this.premiumCalculatorForm.patchValue({
          sumInsured: this.currencyPipe.transform(form.sumInsured.replace(/\D/g, '').replace(/^0+/, ''), '$','symbol','3.0-0')
          },
          { emitEvent: false });
      }
    });
  }

  //Form Validation functions
  public validateControl = (controlName: string) => {
    return this.premiumCalculatorForm.controls[controlName].invalid &&
           this.premiumCalculatorForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.premiumCalculatorForm.controls[controlName].hasError(errorName);
  }

}
