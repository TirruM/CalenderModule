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
  public startDate: Date;
  public endDate: Date;
  public selectDate: Date = null;
  public annuallyCalendarObj: Array<CalenderModel> = [];
  public endYearValidationFlag = true;
  public dateValidationFlag = true;
  public startYear: number;
  public endYear: number;
  public endYearConditionValidationFlag = true;


  @Output() public annuallyCalendarChanged = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  private startYearHandler(event) {
    if (this.startDate == undefined) {
      this.endYearValidationFlag = true;
    } else {
      this.startYear = moment(this.startDate).format("YYYY");
      this.endYearValidationFlag = false;

    }

    if (this.startDate != undefined && this.endDate != undefined && this.selectDate != undefined) {
      this.selectDateHandler(event);
    }

  }
  private endYearHandler(event) {
    if (this.endDate == undefined) {
      this.dateValidationFlag = true;
    } else {

      this.endYear = moment(this.endDate).format("YYYY");
      console.log("end Year is", this.endYear + " " + ((this.endYear < this.startYear)));

      if (this.endYear < this.startYear) {
        this.dateValidationFlag = true;
        this.endYearConditionValidationFlag = false;
      } else {
        this.endYearConditionValidationFlag = true;
        this.dateValidationFlag = false;
      }
    }

    if (this.startDate != undefined && this.endDate != undefined && this.selectDate != undefined) {
      this.selectDateHandler(event);
    }
  }

  private selectDateHandler(event) {
    if (this.startYear == undefined && this.endYear == undefined) {
    } else if (this.selectDate !== null) {
      let currentDate: Date = new Date(moment(this.selectDate).format('YYYY-MM-DD'));
      this.annuallyCalendarObj = [];
      for (let i = this.startYear; i <= this.endYear; i++) {
        var calDate = currentDate;
        var month = calDate.getMonth();
        var date = calDate.getDate();
        var selectedDateObj = new Date(i, month, date);
        var dayObj = moment(selectedDateObj).format("YYYY-MM-DD ");
        let calenderModel = new CalenderModel();
        calenderModel.start_date = dayObj;
        calenderModel.end_date = dayObj;
        this.annuallyCalendarObj.push(calenderModel);
        if (i === this.endYear - 1) {
          this.annuallyCalendarChanged.emit(this.annuallyCalendarObj)
          console.log("final annually object--->" + JSON.stringify(this.annuallyCalendarObj));
        }
      }
    }
  }
}
