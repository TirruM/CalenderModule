import { Moment } from 'moment';
import { CalenderModel } from './../models/calender';
import { Utils } from './../custom/Utils';
import { EveryDayModel } from '../models/everyDayModel';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;


@Component({
  selector: 'app-everyday',
  templateUrl: './everyday.component.html',
  styleUrls: ['./everyday.component.css']
})
export class EverydayComponent implements OnInit {

  public startDateValidation = true;
  public startDate: Date;
  public endDate: Date;
  public weeksDays = false;
  public govHolyDays = false;
  public utilsObj: Utils = new Utils(this.datePipe);
  public weeksDaysCount = 'Except Weekends';
  public govtHolidaysCount = 'Except Government Holidays ';
  public everDayModel: EveryDayModel = <EveryDayModel>{};
  public everyDayCalendarObj: Array<CalenderModel>;
  public startDateFlag = false;
  public endDateFlag = true;

  public everyValidationFlag = false;
  public mainErrorMsg: String = '';

  //   Static Goverment Holiday
  public govtHolidaysArrayObj: any = [
    { id: 1, holiday: '15-10-2018' },
    { id: 2, holiday: '22-10-2018' }
  ];

  @Output() public dateChanged = new EventEmitter();
  handleEndDateChange(event) {
    if (this.startDate == null) {
      this.startDateValidation = false;
    }
  }
  constructor(public datePipe: DatePipe) { }

  ngOnInit() {

  }

  private startDateEventHandler(event) {
    if (this.startDate === undefined || this.startDate.toString() === '') {
      this.endDateFlag = true;
    } else {
      if (this.endDate !== undefined) {
        let startD = new Date(moment(this.startDate).format('YYYY-MM-DD')).getTime();
        let endD = new Date(moment(this.endDate).format('YYYY-MM-DD')).getTime();

        if (startD > endD) {
          this.mainErrorMsg = 'Start date is greater that end date !';
          this.everyValidationFlag = true;
        } else {
          this.everyValidationFlag = false;
          this.handleChange(event);
        }
      } else {
        this.endDateFlag = false;
      }

    }

  }

  private endDateEventHandler(event) {
    if (this.startDate === undefined || this.startDate.toString() === '') {
      this.endDateFlag = true;
    } else {
      let startD = new Date(moment(this.startDate).format('YYYY-MM-DD')).getTime();
      let endD = new Date(moment(this.endDate).format('YYYY-MM-DD')).getTime();

      if (startD > endD) {
        this.mainErrorMsg = 'Start Date is greater that endDate !';
        this.everyValidationFlag = true;
      } else {
        this.everyValidationFlag = false;
        this.handleChange(event);
      }
    }

  }

  private handleChange(event) {
    if (this.startDate !== undefined && this.endDate !== undefined) {
      this.everyDayCalendarObj = [];

      let startTime = this.startDate;
      let endTime = this.endDate;

      let calDate = new Date(startTime);
      let year = calDate.getFullYear();
      let month = calDate.getMonth() + 1;
      let date = calDate.getDate();
      let eCalDate = new Date(endTime);
      let eYear = eCalDate.getFullYear();
      let eMonth = eCalDate.getMonth();
      let eDate = eCalDate.getDate();

      if (this.startDate !== undefined && this.endDate !== undefined) {
        if (date > eDate) {
          this.endDate = null;
        }
      }

      let totalDates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        false, -1);

      let dates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        this.weeksDays, 0);


      for (let j = 0; j < dates.length; j++) {
        if (dates[j] === null) {
          dates.splice(j, 1);
        }
      }

      if (this.weeksDays) {
        let weekDaysCount = totalDates.length - dates.length;
        this.weeksDaysCount = 'Except Weekends ( ' + (weekDaysCount) + ' days)';
      } else {
        this.weeksDaysCount = 'Except Weekends ';
      }

      let calArr = [];
      let pipe = new DatePipe('en-US');
      dates.forEach(function (date) {

        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');
        calArr.push(calenderModel);
      });


      let govtCount = 0;
      if (this.govHolyDays) {
        for (let j = 0; j < calArr.length; j++) {
          let calenderModel = new CalenderModel();
          calenderModel = calArr[j];
          for (let i = 0; i < this.govtHolidaysArrayObj.length; i++) {
            if (calenderModel.start_date == this.govtHolidaysArrayObj[i].holiday) {
              delete calArr[j];
              govtCount++;
            }
          }

        }
        if (govtCount > 0) {
          this.govtHolidaysCount = 'Except Government Holidays (' + govtCount + ' days)';
        } else {
          this.govtHolidaysCount = 'Except Government Holidays ';
        }
      } else {
        this.govtHolidaysCount = 'Except Government Holidays ';
      }
      this.everyDayCalendarObj = calArr;
      this.dateChanged.emit(this.everyDayCalendarObj);
    }
  }

  private onWeekdaysChange(event) {
    if (this.weeksDays === true) {
      this.weeksDays = true;
    } else {
      this.weeksDays = false;
    }
    this.handleChange(event);
  }
  private onGovHolidaysChange(event) {
    if (this.weeksDays === true) {
      this.weeksDays = true;
    } else {
      this.weeksDays = false;
    }
    this.handleChange(event);
  }

}
