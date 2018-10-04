import { Utils } from './../custom/Utils';
import { QuarterlyModel } from './../models/quarterlyModel';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalenderModel } from '../models/calender';
import { OportunityInstance } from '../models/oppertunityInstance';
import { EveryDayModel } from '../models/everyDayModel';


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

  session_type_name = "One Time";
  session_type_id = "1";
  dsession: any[] = [
    { id: "1", name: 'One Time' },
    { id: "2", name: 'Everyday' },
    { id: "3", name: 'Weekly' },
    { id: "4", name: 'Bi-weekly' },
    { id: "5", name: 'Monthly' },
    { id: "6", name: 'Quarterly' },
    { id: "7", name: 'Half Yearly' },
    { id: "8", name: 'Annually' }
  ];

  calendarModel: CalenderModel = <CalenderModel>{};
  oportunityInstanceModel: OportunityInstance = <OportunityInstance>{};
  everyDayModel: EveryDayModel = <EveryDayModel>{};
  quarterlyModel: QuarterlyModel = <QuarterlyModel>{};
  public monthlyCalendarObj: Array<CalenderModel>;
  public annuallyCalendarObj: Array<CalenderModel>;
  public weeklyCalendarObj: Array<CalenderModel>;
  public biWeeklyCalendarObj: Array<CalenderModel>;
  public everyDayCalendarObj: Array<CalenderModel>;

  utilsObj: Utils = new Utils(this.datePipe);

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
      this.session_type_id = this.dsession[index].id;
      this.session_type_name = this.dsession[index].name;

    }
  }

  dateChangedHandler(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  everyDateChangedHandler(everyDayCalendarObj: Array<CalenderModel>) {
    this.everyDayCalendarObj = everyDayCalendarObj
  }

  quarterlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  halfYearlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  monthlyCalendarChangeHandler(monthlyCalendarObj: Array<CalenderModel>) {
    this.monthlyCalendarObj = monthlyCalendarObj;
  }
  annuallyCalendarChangeHandler(annuallyCalendarObj: Array<CalenderModel>) {
    this.annuallyCalendarObj = annuallyCalendarObj;
  }

  weeklyCalendarChangedHandler(weeklyCalendarObj: Array<CalenderModel>) {
    this.weeklyCalendarObj = weeklyCalendarObj;
  }

  biWeeklyCalendarChangedHandler(biWeeklyCalendarObj: Array<CalenderModel>) {
    this.biWeeklyCalendarObj = biWeeklyCalendarObj;
  }

  saveCalender(payload: NgForm): void {

    this.oportunityInstanceModel.session_type_id = this.session_type_id;
    this.oportunityInstanceModel.start_time = this.datePipe.transform(this.start_time, 'hh:MM:ss a');
    this.oportunityInstanceModel.end_time = this.datePipe.transform(this.end_time, 'hh:MM:ss a');

    if (this.session_type_id == "1") {
      this.session_type_name = "One Time";

      let calenderModel1 = new CalenderModel();
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      calenderModel1.start_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MM-yyyy');
      calenderModel1.end_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MM-yyyy');

      let calArr = [];
      calArr.push(calenderModel1);
      this.oportunityInstanceModel.days = calArr;
      console.log("One Time:::" + JSON.stringify(this.oportunityInstanceModel));
    }
    else if (this.session_type_id == "2") {
      this.session_type_name = "Everyday";
      var startTime = this.everyDayModel.startDate;
      var endTime = this.everyDayModel.endDate;
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.everyDayCalendarObj;
      console.log("Everyday:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "3") {
      this.session_type_name = "Weekly";
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.weeklyCalendarObj;
      console.log("Weekly:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "4") {
      this.session_type_name = "Bi-weekly";
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.biWeeklyCalendarObj;
      console.log("Bi Weekly:::" + JSON.stringify(this.oportunityInstanceModel));
    }
    else if (this.session_type_id == "5") {
      this.session_type_name = "Monthly";
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.monthlyCalendarObj;
      console.log("Monthly:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "6") {
      this.session_type_name = "Quarterly";
      let calArr = [];
      for (var i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
        calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
        calArr.push(calenderModel);
      }
      this.oportunityInstanceModel.days = calArr;
      console.log("Quaterly Yearly:::" + JSON.stringify(this.oportunityInstanceModel));
    } else if (this.session_type_id == "7") {
      this.session_type_name = "Half Yearly";
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      let calArr = [];
      for (var i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
        let calenderModel = new CalenderModel();
        calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
        calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
        calArr.push(calenderModel);
      }
      this.oportunityInstanceModel.days = calArr;
      console.log("Half Yearly:::" + JSON.stringify(this.oportunityInstanceModel));
    }

    else if (this.session_type_id == "8") {
      this.session_type_name = "Annually";
      this.oportunityInstanceModel.session_type_name = this.session_type_name;
      this.oportunityInstanceModel.days = [];
      this.oportunityInstanceModel.days = this.annuallyCalendarObj;
      console.log("Annually:::" + JSON.stringify(this.oportunityInstanceModel));
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
