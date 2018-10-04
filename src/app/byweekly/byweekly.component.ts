import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalenderModel } from '../models/calender';
import { Utils } from './../custom/Utils';

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
  selector: 'app-byweekly',
  templateUrl: './byweekly.component.html',
  styleUrls: ['./byweekly.component.css'],
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class ByweeklyComponent implements OnInit {

  public selectedMoment: string;
  public strDate: Date;
  public endsDate: Date;
  public fromYear: number;
  public toYear: number;
  public fromMonth: number;
  public toMonth: number;
  public biWeeklyCalendarObj: Array<CalenderModel> = [];
  selectedWeekDays: any = [];
  utilsObj: Utils = new Utils(this.datePipe);

  @Output() public biWeeklyCalendarChanged = new EventEmitter();

  constructor(public datePipe: DatePipe) { }

  ngOnInit() {
  }

  public startDate = new FormControl(moment());
  public endDate = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.startDate.value;
    ctrlValue.year(normalizedYear.year());
    this.startDate.setValue(ctrlValue);
    console.log("startDate-->", this.startDate);
  }

  chosenMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {

    const ctrlValue = this.startDate.value;
    console.log("ctrValue", ctrlValue);
    ctrlValue.month(normalizedMonth.month());
    this.startDate.setValue(ctrlValue);
    datePicker.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.endDate.value;
    console.log("ctrValue111", ctrlValue);

    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    console.log("ctrValue222", ctrlValue);

    this.endDate.setValue(ctrlValue);
    datePicker.close();
  }

  yearMonthHandler(event) {
    let now = moment(this.strDate).format("MMM YYYY");
    this.fromYear = moment(this.strDate).format("YYYY");
    this.fromMonth = moment(this.strDate).format("MM");

    let now1 = moment(this.endsDate).format("MMM YYYY");
    this.toYear = moment(this.endsDate).format("YYYY");
    this.toMonth = moment(this.endsDate).format("MM");
  }

  handleChange(event) {
    console.log(moment(this.selectedMoment).format("DD/MM/YYYY"))
    var year = moment(this.selectedMoment).format("YYYY");
    var month = moment(this.selectedMoment).format("MM");
    var date = moment(this.selectedMoment).format("DD");

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
    console.log("selected month1", month1);
    var calDate = new Date(this.strDate);
    var year = calDate.getFullYear();
    var month = calDate.getMonth();
    var date = calDate.getDate();

    var eCalDate = new Date(this.endsDate);
    var eYear = eCalDate.getFullYear();
    var eMonth = eCalDate.getMonth();
    var eDate = eCalDate.getDate();
    var dates = this.utilsObj.getDates(new Date(year, month, date), new Date(eYear, eMonth, eDate), false, now);
    var pipe = new DatePipe('en-US');
    let byWeeklyArr = [];
    
    var i = 0;
    dates.forEach(function (date) {
      if (i % 2 === 0) {
        console.log("i/2==0 val---->" + i % 2);
        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');
        byWeeklyArr.push(calenderModel);
      } else {
        console.log("i/2 !=0 val---->" + i % 2);
      }
      i++;

    });
    this.biWeeklyCalendarObj = byWeeklyArr;
    console.log("calArr---->", JSON.stringify(this.biWeeklyCalendarObj));

    this.biWeeklyCalendarChanged.emit(this.biWeeklyCalendarObj);

  }
}

