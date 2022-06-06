import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { currencyRangeValidator } from '../shared/validators/currency-range.validator';
import { CalculateAge, GetDobByAge } from '../shared/date-helper';
import { PremiumService } from '../shared/services/premium.service';
import { IOccupation } from '../_interfaces/premium/IOccupation.model'
import { Quote } from '../_interfaces/premium/IQuote.model'

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css']
})

export class CalculatePremiumComponent implements OnInit
{
  //Date range for DOB form input 
  youngestDob: string = "";
  oldestDob: string = "";

  //List of all occupation options
  occupations = new Array<IOccupation>();

  //Place holder for the calculated premium
  monthlyPremiumTotal: number = 0;

  //Premium calculator form
  premiumCalculatorForm: FormGroup;

  constructor(private premiumService: PremiumService, private currencyPipe: CurrencyPipe, private datePipe: DatePipe) { }

  ngOnInit(): void {
    //Set max DOB range
    this.youngestDob = this.datePipe.transform(GetDobByAge(18), "yyyy-MM-dd") ?? "";
    this.oldestDob = this.datePipe.transform(GetDobByAge(90), "yyyy-MM-dd") ?? ""; 

    this.buildForm();

    //get occupations
    this.premiumService.getOccupations()
      .subscribe(value =>
      {
        if (value == null)
          console.log("Unable to get occupations");
        else 
          this.occupations = value;
      });
  }

  private buildForm() {
    //Premium calculator form
    this.premiumCalculatorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required, Validators.min(18), Validators.max(90)]),
      dob: new FormControl("", [Validators.required]),
      occupation: new FormControl(this.occupations, [Validators.required]),
      sumInsured: new FormControl("", [Validators.required, currencyRangeValidator(1000, 10000)])
    });

    //Set-up event to format currency value, in sum insured input field
    this.premiumCalculatorForm.valueChanges.subscribe(form => {
      if (form.sumInsured) {
        this.premiumCalculatorForm.patchValue({
            sumInsured: this.currencyPipe.transform(form.sumInsured.replace(/\D/g, '').replace(/^0+/, ''), '$', 'symbol', '3.0-0')
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

  //Event handler to calculate premium to be displayed
  public calculatePremium() {
    if (this.premiumCalculatorForm.valid) {
      var quote = new Quote(
        this.premiumCalculatorForm.controls.age.value,
        this.premiumCalculatorForm.controls.dob.value,
        (this.premiumCalculatorForm.controls.occupation.value as IOccupation).id,
        this.premiumCalculatorForm.controls.sumInsured.value.replace(/\D/g, '')
      );

      //Call API to preform premium calculation
      this.premiumService.getPremium(quote).subscribe(quote => {
        this.monthlyPremiumTotal = quote.premium;
      });
    }
    else
      this.premiumCalculatorForm.markAllAsTouched();
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
