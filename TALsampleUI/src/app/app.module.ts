import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { CalculatePremiumComponent } from './calculate-premium/calculate-premium.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatePremiumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyPipe, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
