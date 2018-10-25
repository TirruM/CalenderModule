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
  public start_time = null;
  public end_time = null;
  public message = '';
  private selectedDate: string;
  private start_date = '';
  public session_type_name = 'One Time';
  private session_type_id = '1';

  public sessionObj: any[] = [
    { id: '1', name: 'One Time' },
    { id: '2', name: 'Everyday' },
    { id: '3', name: 'Weekly' },
    { id: '4', name: 'Bi-weekly' },
    { id: '5', name: 'Monthly' },
    { id: '6', name: 'Quarterly' },
    { id: '7', name: 'Half Yearly' },
    { id: '8', name: 'Annually' }
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
  public quartValidation = true;
  public halfValidation = true;

  public dateValidationFlag = false;
  public mainErrorMsg: String = '';

  utilsObj: Utils = new Utils(this.datePipe);

  constructor(public datePipe: DatePipe) {
    this.start_date = this.start_date;
  }

  ngOnInit() {

  }

  // for radio button handler
  private handleChange(event) {
    const index = this.sessionObj.findIndex((ds: any) => {
      return ds.id + '' === event.target.id;
    });

    if (index > -1) {
      this.session_type_id = this.sessionObj[index].id;
      this.session_type_name = this.sessionObj[index].name;
    }
    this.start_time = null;
    this.end_time = null;
    this.message = null;
    if (this.session_type_id !== '7') {
      this.halfValidation = true;
    }
    if (this.session_type_id !== '6') {
      this.quartValidation = true;
    }

    this.mainErrorMsg = '';
    this.dateValidationFlag = false;
  }

  private dateChangedHandler(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  private everyDateChangedHandler(everyDayCalendarObj: Array<CalenderModel>) {
    this.everyDayCalendarObj = everyDayCalendarObj;
  }

  private quarterlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  private halfYearlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  private monthlyCalendarChangeHandler(monthlyCalendarObj: Array<CalenderModel>) {
    this.monthlyCalendarObj = monthlyCalendarObj;
  }
  private annuallyCalendarChangeHandler(annuallyCalendarObj: Array<CalenderModel>) {
    this.annuallyCalendarObj = annuallyCalendarObj;
  }

  private weeklyCalendarChangedHandler(weeklyCalendarObj: Array<CalenderModel>) {
    this.weeklyCalendarObj = weeklyCalendarObj;
  }

  private biWeeklyCalendarChangedHandler(biWeeklyCalendarObj: Array<CalenderModel>) {
    this.biWeeklyCalendarObj = biWeeklyCalendarObj;
  }

  public saveCalender(payload: NgForm): void {
    if (this.start_time === undefined || (this.start_time === null)) {
      this.mainErrorMsg = 'Please select start time !';
      this.dateValidationFlag = true;
    } else if (this.end_time === undefined || this.start_time === null) {
      this.mainErrorMsg = 'Please select end time';
      this.dateValidationFlag = true;
    } else if ((new Date(this.start_time).getTime()) >
      (new Date(this.end_time).getTime())) {
      this.mainErrorMsg = 'Start time is not greater that end time !';
      this.dateValidationFlag = true;
    } else {
      this.dateValidationFlag = false;
      this.mainErrorMsg = '';
      this.oportunityInstanceModel.session_type_id = this.session_type_id;
      this.oportunityInstanceModel.start_time = this.datePipe.transform(this.start_time, 'hh:mm:ss a');
      this.oportunityInstanceModel.end_time = this.datePipe.transform(this.end_time, 'hh:mm:ss a');
      if (this.session_type_id === '1') {
        this.session_type_name = 'One Time';
        if (this.selectedDate !== undefined) {
          this.dateValidationFlag = false;
          const calenderModel1 = new CalenderModel();
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          calenderModel1.start_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MM-yyyy');
          calenderModel1.end_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MM-yyyy');
          const calArr = [];
          calArr.push(calenderModel1);
          this.oportunityInstanceModel.days = calArr;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        } else {
          this.mainErrorMsg = 'Please select date !';
          this.dateValidationFlag = true;
        }
      } else if (this.session_type_id === '2') {
        this.session_type_name = 'Everyday';
        if (this.everyDayCalendarObj === undefined || this.everyDayCalendarObj === null) {
          this.mainErrorMsg = 'Please select start Date and End Date Properly !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.everyDayCalendarObj;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '3') {
        this.session_type_name = 'Weekly';
        if (this.weeklyCalendarObj === undefined || this.weeklyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.weeklyCalendarObj;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '4') {
        this.session_type_name = 'Bi-weekly';
        if (this.biWeeklyCalendarObj === undefined || this.biWeeklyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.biWeeklyCalendarObj;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '5') {
        this.session_type_name = 'Monthly';
        if (this.monthlyCalendarObj === undefined || this.monthlyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.monthlyCalendarObj;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }



      } else if (this.session_type_id === '6') {
        this.session_type_name = 'Quarterly';
        const calArr = [];
        if (this.quarterlyModel.quarterlyModel.length > 0) {
          for (let i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
            const calenderModel = new CalenderModel();
            calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
            calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
            calArr.push(calenderModel);
          }
          this.oportunityInstanceModel.days = calArr;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '7') {
        this.session_type_name = 'Half Yearly';
        this.oportunityInstanceModel.session_type_name = this.session_type_name;
        const calArr = [];
        for (let i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
          const calenderModel = new CalenderModel();
          calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
          calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
          calArr.push(calenderModel);
        }
        this.oportunityInstanceModel.days = calArr;
        if (calArr.length > 0) {
          this.halfValidation = true;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        } else {
          this.halfValidation = false;
          this.message = "";//JSON.stringify(this.oportunityInstanceModel);
        }

      } else if (this.session_type_id === '8') {
        this.session_type_name = 'Annually';
        if (this.annuallyCalendarObj === undefined || this.annuallyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.annuallyCalendarObj;
          this.message = JSON.stringify(this.oportunityInstanceModel);
        }

      }
    }
  }


}
