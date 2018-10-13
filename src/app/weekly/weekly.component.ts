import { Utils } from './../custom/Utils';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalenderModel } from '../models/calender';
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
import { Logs } from 'selenium-webdriver';

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
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class WeeklyComponent implements OnInit {

  public selectedMoment: string;
  public strDate: Date;
  public endsDate: Date;
  public fromYear: number;
  public toYear: number;
  public fromMonth: number;
  public toMonth: number;
  public weeklyCalendarObj: Array<CalenderModel> = [];
  utilsObj: Utils = new Utils(this.datePipe);
  selectedWeekDays: any = [];
  public endDateValidation = true;
  public dateValidationFlag = true;

  public weeklyValidationFlag = false;
  public mainErrorMsg = '';
  public startDate = new FormControl(moment());
  public endDate = new FormControl(moment());

  @Output() public weeklyCalendarChanged = new EventEmitter();

  constructor(public datePipe: DatePipe) { }

  ngOnInit() {
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.startDate.value;
    ctrlValue.year(normalizedYear.year());
    this.startDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.startDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.startDate.setValue(ctrlValue);
    datePicker.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.endDate.value;
    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.endDate.setValue(ctrlValue);
    datePicker.close();
  }

  yearMonthHandler(event) {
    if (this.strDate === undefined || this.strDate.toString() === '') {
      this.endDateValidation = true;
    } else {
      this.endDateValidation = false;
    }

    if (this.endsDate === undefined || this.endsDate.toString() === '') {
      this.dateValidationFlag = true;
    } else {
      this.dateValidationFlag = false;
    }

    if (this.strDate > this.endsDate) {
      this.mainErrorMsg = 'Start Date is greater that endDate !';
      this.weeklyValidationFlag = true;
    } else {
      this.weeklyValidationFlag = false;
    }


    let now = moment(this.strDate).format('MMM YYYY');
    this.fromYear = moment(this.strDate).format('YYYY');
    this.fromMonth = moment(this.strDate).format('MM');

    let now1 = moment(this.endsDate).format('MMM YYYY');
    this.toYear = moment(this.endsDate).format('YYYY');
    this.toMonth = moment(this.endsDate).format('MM');
  }

  handleChange(event) {
    let year = moment(this.selectedMoment).format('YYYY');
    let month = moment(this.selectedMoment).format('MM');
    let date = moment(this.selectedMoment).format('DD');

    let now = new Date(new Date(year, month - 1, date));

    if (this.selectedWeekDays.length > 0) {
      if (this.selectedWeekDays.includes(now.getDay())) {
      } else {
        this.selectedWeekDays.push(now.getDay());
      }
    } else {
      this.selectedWeekDays.push(now.getDay());
    }
    if (this.strDate !== null && this.endsDate !== null) {
      this.prepareWeekObj(now.getDay(), month);
    }
  }

  prepareWeekObj(now, month1: any) {
    let calDate = new Date(this.strDate);
    let year = calDate.getFullYear();
    let month = calDate.getMonth();
    let date = calDate.getDate();
    let eCalDate = new Date(this.endsDate);
    let eYear = eCalDate.getFullYear();
    let eMonth = eCalDate.getMonth();
    let eDate = eCalDate.getDate();
    let dates = this.utilsObj.getMultipleWeekDates(new Date(year, month, date), new Date(eYear, eMonth, eDate),
      false, this.selectedWeekDays);
    let pipe = new DatePipe('en-US');
    let calArr = [];
    let byWeeklyArr = [];
    let i = 0;
    dates.forEach(function (date) {
      let calenderModel = new CalenderModel();
      calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
      calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');
      calArr.push(calenderModel);
    });
    this.weeklyCalendarObj = calArr;
    this.weeklyCalendarChanged.emit(this.weeklyCalendarObj);
  }
}
