import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { FormControl } from '@angular/forms';
import { Utils } from './../custom/Utils';
import { DatePipe } from '@angular/common';
import { CalenderModel } from './../models/calender';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import { Moment } from 'moment';
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const moment = (_moment as any).default ? (_moment as any).default : _moment;
/* 
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
}) */


@Component({
  selector: 'app-byweekly',
  templateUrl: './byweekly.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
    .custom-day.selected{  
      background-color: rgba(255, 255, 0, .5);
        
    }
  `]
})
export class ByweeklyComponent {
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  selectedWeekDays: any = [];
  _datesSelected: NgbDateStruct[] = [];
  public selectedMoment: string;
  public strDate: Date;
  public endsDate: Date;
  public fromYear: number;
  public toYear: number;
  public fromMonth: number;
  public toMonth: number;
  public biWeeklyCalendarObj: Array<CalenderModel> = [];
  utilsObj: Utils = new Utils(this.datePipe);
  public dateValidationFlag = true;
  public endDateValidation = true;

  public weeklyValidationFlag = false;
  public mainErrorMsg = '';
  public startDate = new FormControl(moment());
  public endDate = new FormControl(moment());

  @Input()
  set datesSelected(value: NgbDateStruct[]) {
    this._datesSelected = value;

  }
  get datesSelected(): NgbDateStruct[] {
    return this._datesSelected ? this._datesSelected : [];
  }
  @Output() public biWeeklyCalendarChanged = new EventEmitter();


  constructor(calendar: NgbCalendar, public datePipe: DatePipe) {
    this.datePipe = datePipe;
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
      this.mainErrorMsg = 'Start date is greater that end date !';
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
    this.onDateSelection(event, null);
  }

  onDateSelection(event: any, date: NgbDateStruct) {
    console.log("selected date", JSON.stringify(date));
    let now;
    if (date === null) {
    } else {
      now = new Date(date.year, date.month - 1, date.day);
      if (this.selectedWeekDays.length > 0) {
        if (this.selectedWeekDays.includes(now.getDay())) {
          console.log("onDateSelection  includes " + now.getDay() + this.selectedWeekDays.length);
          for (let i = 0; i < this.selectedWeekDays.length; i++) {
            console.log("selected day--->" + now.getDay());
            console.log("selected weekday from Array---->" + this.selectedWeekDays[i]);

            if (this.selectedWeekDays[i] === now.getDay()) {
              console.log("selected weekday from Array--->" + this.selectedWeekDays[i]);
              this.selectedWeekDays.splice(i, 1);
            }
          }

        } else {
          this.selectedWeekDays.push(now.getDay());
        }
      } else {
        this.selectedWeekDays.push(now.getDay());
      }
    }

    let sCalDate = new Date(this.strDate);
    let sYear = sCalDate.getFullYear();
    let sMonth = sCalDate.getMonth();
    let sDate = sCalDate.getDate();
    let eCalDate = new Date(this.endsDate);
    let eYear = eCalDate.getFullYear();
    let eMonth = eCalDate.getMonth();
    let eDate = eCalDate.getDate();


    let dates = this.utilsObj.getDates(new Date(sYear, sMonth, sDate),
      new Date(eYear, eMonth, eDate), false,
      this.selectedWeekDays);

    console.log("dates array", JSON.stringify(dates));

    this.datesSelected = [];
    let calArr = [];

    for (let j = 0; j < this.selectedWeekDays.length; j++) {
      let ctr = 0;
      for (let i = 0; i < dates.length; i++) {

        let year = this.datePipe.transform(dates[i], 'yyyy');
        let date = this.datePipe.transform(dates[i], 'dd');
        let month = this.datePipe.transform(dates[i], 'MM');

        now = new Date(parseInt(year), parseInt(month) - 1, parseInt(date));

        if (now.getDay() === this.selectedWeekDays[j]) {
          if (ctr % 2 == 0) {
            let dateObj = {
              "year": parseInt(year),
              "month": parseInt(month),
              "day": parseInt(date)
            };

            this.datesSelected.push(dateObj);

            let calenderModel = new CalenderModel();
            calenderModel.start_date = year + "-" + month + "-" + date;
            calenderModel.end_date = year + "-" + month + "-" + date;//this.datePipe.transform(date, 'dd-MM-yyyy');
            calArr.push(calenderModel);
            ctr = ctr + 1;
          } else {
            ctr = ctr + 1;
          }
        }
        // if (i % 2 === 0) {

        // }
      }
    }



    this.biWeeklyCalendarObj = calArr;
    this.biWeeklyCalendarChanged.emit(this.biWeeklyCalendarObj);
    // console.log("datesSelected", JSON.stringify(this.datesSelected));
    console.log("weeklyCalendarObj", JSON.stringify(this.biWeeklyCalendarObj));
  }




  addDate(date: NgbDateStruct) {
    let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year);
    if (index >= 0)       //If exist, remove the date
      this.datesSelected.splice(index, 1);
    else   //a simple push
      this.datesSelected.push(date);
  }
  addRangeDate(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    //We get the getTime() of the dates from and to
    let from = new Date(fromDate.year + "-" + fromDate.month + "-" + fromDate.day).getTime();
    let to = new Date(toDate.year + "-" + toDate.month + "-" + toDate.day).getTime();
    for (let time = from; time <= to; time += (24 * 60 * 60 * 1000)) //add one day
    {
      let date = new Date(time);
      //javascript getMonth give 0 to January, 1, to February...
      this.addDate({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }
    // this.datesSelectedChange.emit(this.datesSelected);
  }
  //return true if is selected
  isDateSelected(date: NgbDateStruct) {
    return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
  }
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);


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
    let dates = this.utilsObj.getDates(new Date(year, month, date), new Date(eYear, eMonth, eDate), false, now);
    let pipe = new DatePipe('en-US');
    let byWeeklyArr = [];

    let i = 0;
    dates.forEach(function (date) {
      if (i % 2 === 0) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');
        byWeeklyArr.push(calenderModel);
      } else {
      }
      i++;
    });

    this.biWeeklyCalendarObj = byWeeklyArr;
    this.biWeeklyCalendarChanged.emit(this.biWeeklyCalendarObj);

  }
}

