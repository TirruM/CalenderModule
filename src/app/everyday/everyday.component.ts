import { CalenderModel } from './../models/calender';
import { Utils } from './../custom/Utils';
import { EveryDayModel } from '../models/everyDayModel';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-everyday',
  templateUrl: './everyday.component.html',
  styleUrls: ['./everyday.component.css']
})
export class EverydayComponent implements OnInit {

  public startDate: Date;
  public endDate: Date;
  public weeksDays = false;
  public govHolyDays = false;
  public utilsObj: Utils = new Utils(this.datePipe);
  public weeksDaysCount: string = "Except Weekends";
  public govtHolidaysCount: string = "Except Government Holidays ";
  public everDayModel: EveryDayModel = <EveryDayModel>{};
  public everyDayCalendarObj: Array<CalenderModel>;
  public govtHolidaysArrayObj: any = [
    { id: 1, holiday: "15-10-2018" },
    { id: 2, holiday: "22-10-2018" }
  ];

  @Output() public dateChanged = new EventEmitter();

  handleChange(event) {
    this.everyDayCalendarObj = [];
    /*  this.everDayModel.startDate = this.startDate;
     this.everDayModel.endDate = this.endDate;
     this.everDayModel.weeksDays = this.weeksDays;
     this.everDayModel.govHolidays = this.govHolyDays; */
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

    var totalDates = this.utilsObj.getDates(new Date(year, month - 1, date),
      new Date(eYear, eMonth, eDate),
      false, -1);

    var dates = this.utilsObj.getDates(new Date(year, month - 1, date),
      new Date(eYear, eMonth, eDate),
      this.weeksDays, 0);

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
      console.log("final Arra", JSON.stringify(calArr));
      console.log("govtCount", govtCount);
      if (govtCount > 0) {
        this.govtHolidaysCount = "Except Government Holidays (" + govtCount + " days)";
      } else {
        this.govtHolidaysCount = "Except Government Holidays ";
      }
    }

    this.everyDayCalendarObj = calArr;
    this.dateChanged.emit(this.everyDayCalendarObj);
  }


  onWeekdaysChange() {
    this.weeksDays = !this.weeksDays;
    this.handleChange(event);
  }
  onGovHolidaysChange() {
    this.govHolyDays = !this.govHolyDays;
    this.handleChange(event);
  }

  constructor(public datePipe: DatePipe) { }

  ngOnInit() {

  }

}
