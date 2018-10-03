import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalenderModel } from '../models/calender';
import { OportunityInstance } from '../models/oppertunityInstance';
import { EveryDayModel } from '../models/everyDayModel';
import { QuaterlyModel } from './../models/quaterlymodel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public start_time: Date;
  public end_time: Date;

  selectedDate: string;
  start_date: string = '';

  session_type_id = "One Time";
  dsession: any[] = [
    { id: 1, name: 'One Time' },
    { id: 2, name: 'Everyday' },
    { id: 3, name: 'Weekly' },
    { id: 4, name: 'Bi-weekly' },
    { id: 5, name: 'Monthly' },
    { id: 6, name: 'Quarterly' },
    { id: 7, name: 'Half Yearly' },
    { id: 8, name: 'Annually' }
  ];

  calendarModel: CalenderModel = <CalenderModel>{};
  oportunityInstanceModel: OportunityInstance = <OportunityInstance>{};
  everyDayModel: EveryDayModel = <EveryDayModel>{};
  quaterlyModel: QuaterlyModel = <QuaterlyModel>{};
  public monthlyCalendarObj: Array<CalenderModel>;
  public annuallyCalendarObj: Array<CalenderModel>;
  public weeklyCalendarObj: Array<CalenderModel>;
  public biWeeklyCalendarObj: Array<CalenderModel>;

  constructor(public datePipe: DatePipe) {
    this.start_date = this.start_date;
  }

  ngOnInit() {

  }

  // for radio button handler
  handleChange(event) {
    var index = this.dsession.findIndex((ds: any) => {
      return ds.id + "" === event.target.id;
    });
    if (index > -1) {
      this.session_type_id = this.dsession[index].name;
    }
  }

  dateChangedHandler(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  everyDateChangedHandler(everyDayModel: EveryDayModel) {
    this.everyDayModel = everyDayModel
  }

  quarterlyDateChangedHandler(quaterlyModel: QuaterlyModel) {
    this.quaterlyModel = quaterlyModel;
  }

  halfYearlyDateChangedHandler(quaterlyModel: QuaterlyModel) {
    this.quaterlyModel = quaterlyModel;
  }

  monthlyCalendarChangeHandler(monthlyCalendarObj: Array<CalenderModel>) {
    this.monthlyCalendarObj = monthlyCalendarObj;

  }
  annuallyCalendarChangeHandler(annuallyCalendarObj: Array<CalenderModel>) {
    this.annuallyCalendarObj = annuallyCalendarObj;

  }

  weeklyCalendarChangedHandler(weeklyCalendarObj: Array<CalenderModel>) {
    this.weeklyCalendarObj = weeklyCalendarObj;
    console.log("week calendar in main" + JSON.stringify(this.weeklyCalendarObj));
  }

  biWeeklyCalendarChangedHandler(biWeeklyCalendarObj: Array<CalenderModel>) {
    this.biWeeklyCalendarObj = biWeeklyCalendarObj;
    console.log("bi week calendar in main" + JSON.stringify(this.biWeeklyCalendarObj));
  }



  saveCalender(payload: NgForm): void {
    this.oportunityInstanceModel.session_type_id = this.session_type_id;
    this.oportunityInstanceModel.start_time = this.datePipe.transform(this.start_time, 'hh:MM:ss a');
    this.oportunityInstanceModel.end_time = this.datePipe.transform(this.end_time, 'hh:MM:ss a');

    if (this.session_type_id == "One Time") {
      let calenderModel1 = new CalenderModel();

      calenderModel1.start_date = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
      calenderModel1.end_date = this.datePipe.transform(this.selectedDate, 'dd-MM-yyyy');
      let calArr = [];
      calArr.push(calenderModel1);
      this.oportunityInstanceModel.days = calArr;
      console.log("One Time:::" + JSON.stringify(this.oportunityInstanceModel));
    }
    else if (this.session_type_id == "Everyday") {

      var startTime = this.everyDayModel.startDate;
      var endTime = this.everyDayModel.endDate;

      var calDate = new Date(startTime);
      var year = calDate.getFullYear();
      var month = calDate.getMonth() + 1;
      var date = calDate.getDate();

      var eCalDate = new Date(endTime);
      var eYear = eCalDate.getFullYear();
      var eMonth = eCalDate.getMonth();
      var eDate = eCalDate.getDate();

      var dates = this.getDates(new Date(year, month - 1, date), new Date(eYear, eMonth, eDate), this.everyDayModel.weeksDays);
      var pipe = new DatePipe('en-US');
      let calArr = [];

      dates.forEach(function (date) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = pipe.transform(date, 'dd-MM-yyyy');
        calenderModel.end_date = pipe.transform(date, 'dd-MM-yyyy');

        calArr.push(calenderModel);
      });
      this.oportunityInstanceModel.days = calArr;
      console.log("Everyday:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "Quarterly") {
      let calArr = [];
      for (var i = 0; i < this.quaterlyModel.quaterlyModel.length; i++) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = this.quaterlyModel.quaterlyModel[i].start_date;
        calenderModel.end_date = this.quaterlyModel.quaterlyModel[i].end_date;
        calArr.push(calenderModel);
      }
      this.oportunityInstanceModel.days = calArr;
      console.log("Quaterly Yearly:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "Half Yearly") {
      let calArr = [];
      for (var i = 0; i < this.quaterlyModel.quaterlyModel.length; i++) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = this.quaterlyModel.quaterlyModel[i].start_date;
        calenderModel.end_date = this.quaterlyModel.quaterlyModel[i].end_date;
        calArr.push(calenderModel);
      }
      this.oportunityInstanceModel.days = calArr;
      console.log("Half Yearly:::" + JSON.stringify(this.oportunityInstanceModel));
    }
    else if (this.session_type_id == "Monthly") {
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.monthlyCalendarObj;
      console.log("Monthly:::" + JSON.stringify(this.oportunityInstanceModel));
    }
    else if (this.session_type_id == "Annually") {
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.annuallyCalendarObj;
      console.log("Annually:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "Weekly") {
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.weeklyCalendarObj;
      console.log("Weekly:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "Bi-weekly") {
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.biWeeklyCalendarObj;
      console.log("Bi Weekly:::" + JSON.stringify(this.oportunityInstanceModel));
    }
  }



  public getDates(startDate, endDate, weekDays): any {

    var day = startDate;
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);

        return date;
      };
    while (currentDate <= endDate) {

      var d = currentDate.getDay();
      if (weekDays) {
        if (d == 0 || d == 6) {

        } else {
          dates.push(currentDate);
        }
      } else {
        dates.push(currentDate);
      }

      currentDate = addDays.call(currentDate, 1);
    }

    return dates;

  }

  /* 
  $scope.start=new Date(2015,6,1); $scope.end= new Date(2015,8,1);
   $scope.weekends = [];
    var day = angular.copy($scope.start);
     while(day < $scope.end){ var d = day.getDay(); if(d === 0 || d === 6)
    { $scope.weekends.push(new Date(day)); } day.setDate(day.getDate()+1); } */
}
