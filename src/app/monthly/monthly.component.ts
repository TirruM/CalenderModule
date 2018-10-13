import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // `MomentDateTimeAdapter` and `OWL_MOMENT_DATE_TIME_FORMATS` can be automatically provided by importing
    // `OwlMomentDateTimeModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },

    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_DATE_TIME_FORMATS },
  ],
})
export class MonthlyComponent implements OnInit {

  public dateTimeRange: Date[];
  public noOfDays = 0;
  public monthlyCalendarObj: Array<CalenderModel>;
  public validationFlag = true;

  @Output() public monthlyCalendarChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    let now = moment(this.dateTimeRange[0]).format('YYYY-MM-DD');
    this.monthlyCalendarObj = [];
    let dateArray = [];
    let currentDate: Date;

    if (this.dateTimeRange[0] !== null) {
      currentDate = new Date(this.dateTimeRange[0]);
      for (let i = 0; i < this.noOfDays; i++) {

        let calDate = currentDate;
        let year = calDate.getFullYear();
        let month = calDate.getMonth();
        let date = calDate.getDate();
        if (i !== 0) {
          date = date + 1;
        }
        let nextDay = new Date(year, month, date);
        currentDate = nextDay;
        let dayObj = moment(currentDate).format('YYYY-MM-DD');
        dateArray.push(dayObj);

        let calenderModel = new CalenderModel();
        calenderModel.start_date = dayObj;
        calenderModel.end_date = dayObj;
        this.monthlyCalendarObj.push(calenderModel);
        if (i === this.noOfDays - 1) {

          this.dateTimeRange.push(nextDay);
          for (let j = 0; j < this.dateTimeRange.length; j++) {
            if (this.dateTimeRange[j] === null) {
              this.dateTimeRange.splice(j, 1);
            }

            if (j === this.dateTimeRange.length - 1) {
            }

          }
          let fromDate = moment(dateArray[0]);
          let toDate = moment(dateArray[this.noOfDays - 1]);
          this.dateTimeRange = [];
          this.dateTimeRange.push(fromDate);
          this.dateTimeRange.push(toDate);

        }
      }
    }

    this.monthlyCalendarChanged.emit(this.monthlyCalendarObj)
  }
  private numberOfDays(event) {
    if (this.noOfDays === undefined || this.noOfDays === 0) {
      this.validationFlag = true;
    } else {
      this.validationFlag = false;
    }

  }

}
