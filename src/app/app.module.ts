import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnetimecalenderComponent } from './onetimecalender/onetimecalender.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { EverydayComponent } from './everyday/everyday.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { QuarterlyComponent } from './quarterly/quarterly.component';
import { HalfyearlyComponent } from './halfyearly/halfyearly.component';
import { AnnuallyComponent } from './annually/annually.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { ByweeklyComponent } from './byweekly/byweekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { ValidatorComponentComponent } from './validator-component/validator-component.component';
import { SelectYearComponent } from './select-year/select-year.component';
import { MultiDatePickerComponent } from './multi-date-picker/multi-date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    OnetimecalenderComponent,
    EverydayComponent,
    QuarterlyComponent,
    HalfyearlyComponent,
    AnnuallyComponent,
    WeeklyComponent,
    ByweeklyComponent,
    MonthlyComponent,
    ValidatorComponentComponent,
    SelectYearComponent,
    MultiDatePickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TimepickerModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
