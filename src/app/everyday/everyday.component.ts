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
  constructor(public datePipe: DatePipe) { }

  ngOnInit() {

  }
  public startDateValidation: boolean = true;
  public startDate: Date;
  public endDate: Date;
  public weeksDays = false;
  public govHolyDays = false;
  public utilsObj: Utils = new Utils(this.datePipe);
  public weeksDaysCount: string = "Except Weekends";
  public govtHolidaysCount: string = "Except Government Holidays ";
  public everDayModel: EveryDayModel = <EveryDayModel>{};
  public everyDayCalendarObj: Array<CalenderModel>;
  public startDateFlag: boolean = false;
  public endDateFlag: boolean = true;


  public govtHolidaysArrayObj: any = [
    { id: 1, holiday: "15-10-2018" },
    { id: 2, holiday: "22-10-2018" }
  ];

  @Output() public dateChanged = new EventEmitter();
  handleEndDateChange(event) {
    if (this.startDate == null) {
      this.startDateValidation = false;
    }
  }

  private startDateEventHandler(event) {
    if (this.startDate == undefined || this.startDate.toString() == "") {
      this.endDateFlag = true;
    } else {

      if (this.endDate != undefined) {

        let startD = new Date(moment(this.startDate).format('YYYY-MM-DD')).getTime();
        let endD = new Date(moment(this.endDate).format('YYYY-MM-DD')).getTime();

        if (startD > endD) {
          console.log("start Date is greater that endDate");

        } else {
          this.handleChange(event);
          // this.endDate = null;
        }

      } else {
        this.endDateFlag = false;
      }

    }

  }

  private endDateEventHandler(event) {
    if (this.startDate == undefined || this.startDate.toString() == "") {
      this.endDateFlag = true;
    } else {
      this.endDateFlag = false;
      //this.handleChange(event);
    }

  }

  private handleChange(event) {
    if (this.startDate != undefined && this.endDate != undefined) {
      this.everyDayCalendarObj = [];

      var startTime = this.startDate;
      var endTime = this.endDate;

      var calDate = new Date(startTime);
      var year = calDate.getFullYear();
      var month = calDate.getMonth() + 1;
      var date = calDate.getDate();

      var eCalDate = new Date(endTime);
      var eYear = eCalDate.getFullYear();
      var eMonth = eCalDate.getMonth();
      var eDate = eCalDate.getDate();

      if (this.startDate != undefined && this.endDate != undefined) {
        if (date > eDate) {
          this.endDate = null;
        }
      }

      var totalDates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        false, -1);

      var dates = this.utilsObj.getDates(new Date(year, month - 1, date),
        new Date(eYear, eMonth, eDate),
        this.weeksDays, 0);

      console.log("dates array", JSON.stringify(dates));

      for (var j = 0; j < dates.length; j++) {
        if (dates[j] === null) {
          dates.splice(j, 1);
          //console.log("sdfsdf after removal null" + JSON.stringify(dates));
        }
      }

      if (this.weeksDays) {
        var weekDaysCount = totalDates.length - dates.length;
        this.weeksDaysCount = "Except Weekends ( " + (weekDaysCount) + " days)";
      } else {
        this.weeksDaysCount = "Except Weekends ";
      }

      let calArr = [];
      var pipe = new DatePipe('en-US');
      dates.forEach(function (date) {

        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');
        calArr.push(calenderModel);
      });



      var govtCount = 0;
      if (this.govHolyDays) {
        for (var j = 0; j < calArr.length; j++) {
          let calenderModel = new CalenderModel();
          calenderModel = calArr[j];
          for (var i = 0; i < this.govtHolidaysArrayObj.length; i++) {
            if (calenderModel.start_date == this.govtHolidaysArrayObj[i].holiday) {
              console.log("car have" + JSON.stringify(calenderModel.start_date));
              //calArr.splice(j, 1);
              delete calArr[j];
              govtCount++;
            }
          }

        }
        if (govtCount > 0) {
          this.govtHolidaysCount = "Except Government Holidays (" + govtCount + " days)";
        } else {
          this.govtHolidaysCount = "Except Government Holidays ";
        }
      } else {
        this.govtHolidaysCount = "Except Government Holidays ";
      }

      this.everyDayCalendarObj = calArr;
      console.log(JSON.stringify(this.everyDayCalendarObj));
      this.dateChanged.emit(this.everyDayCalendarObj);
    }
  }


  private onWeekdaysChange() {
    this.weeksDays = !this.weeksDays;
    this.handleChange(event);
  }
  private onGovHolidaysChange() {
    this.govHolyDays = !this.govHolyDays;
    this.handleChange(event);
  }



}
