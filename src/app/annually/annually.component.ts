import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DateTimeAdapter,
  OWL_DATE_TIME_FORMATS,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeComponent,
  OwlDateTimeFormats
} from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { CalenderModel } from '../models/calender';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

export const MY_MOMENT_DATE_TIME_FORMATS: OwlDateTimeFormats = {
  parseInput: 'MM/YYYY',
  fullPickerInput: 'l LT',
  datePickerInput: 'MM/YYYY',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};


@Component({
  selector: 'app-annually',
  templateUrl: './annually.component.html',
  styleUrls: ['./annually.component.css'],
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class AnnuallyComponent implements OnInit {
  public selectedMoment: string;
  public strDate: Date;
  public endsDate: Date;
  public selectDate: Date = null;
  public annuallyCalendarObj: Array<CalenderModel> = [];
  public endYearValidationFlag = true;
  public dateValidationFlag = true;


  @Output() public annuallyCalendarChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public startDate = new FormControl(moment());
  public endDate = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment, date: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.startDate.value;
    ctrlValue.year(normalizedYear.year());
    this.startDate.setValue(ctrlValue);
    date.close();
  }

  chosenMonthHandler(normalizedMonth: Moment, date: OwlDateTimeComponent<Moment>) {

    const ctrlValue = this.startDate.value;
    //console.log("ctrValue", ctrlValue);
    ctrlValue.month(normalizedMonth.month());
    this.startDate.setValue(ctrlValue);
    date.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.endDate.value;
    //console.log("ctrValue111", ctrlValue);

    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, date: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    // console.log("ctrValue222", ctrlValue);

    this.endDate.setValue(ctrlValue);
    date.close();
  }

  yearMonthHandler(event) {
    if (this.strDate == undefined) {
      this.endYearValidationFlag = true;
    } else {
      this.endYearValidationFlag = false;
    }

    if (this.endsDate == undefined) {
      this.dateValidationFlag = true;
    } else {
      this.dateValidationFlag = false;

      let currentDate: Date;
      let now = moment(this.strDate).format("YYYY");
      let now1 = moment(this.endsDate).format("YYYY");

      if (this.selectDate !== null) {
        let selectedDate = moment(this.selectDate).format("YYYY-MM-DD");
        currentDate = new Date(selectedDate);
        this.annuallyCalendarObj = [];
        for (let i = now; i <= now1; i++) {

          var calDate = currentDate;
          var month = calDate.getMonth() + 1;
          var date = calDate.getDate();
          var selectedDateObj = new Date(i, month, date);
          var dayObj = moment(selectedDateObj).format("YYYY-MM-DD ");
          let calenderModel = new CalenderModel();
          calenderModel.start_date = dayObj;
          calenderModel.end_date = dayObj;
          this.annuallyCalendarObj.push(calenderModel);

          if (i === now1 - 1) {
            this.annuallyCalendarChanged.emit(this.annuallyCalendarObj)
          }
        }
      }
    }
  }


}
