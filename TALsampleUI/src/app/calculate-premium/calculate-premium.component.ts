import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css']
})
export class CalculatePremiumComponent implements OnInit
{
  public premiumCalculatorForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.premiumCalculatorForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      occupation: new FormControl("", [Validators.required]),
      sumInsured: new FormControl("", [Validators.required])
    });
  }

}
