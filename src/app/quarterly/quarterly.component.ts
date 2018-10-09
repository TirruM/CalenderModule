import { ValidationModel } from './validationModel';
import { Utils } from './../custom/Utils';
import { QuarterlyModel } from '../models/quarterlyModel';
import { CalenderModel } from './../models/calender';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-quarterly',
  templateUrl: './quarterly.component.html',
  styleUrls: ['./quarterly.component.css']
})
export class QuarterlyComponent implements OnInit {
  selectedCheckBox = 0;
  firstCheckBox = true;
  secondCheckBox = true;
  thirdCheckBox = true;
  fourCheckBox = true;
  quarterlyModelArray: QuarterlyModel = <QuarterlyModel>{};


  @Output() public dateChanged = new EventEmitter();

  selectOption: any[] = [
    { id: 1, name: 'First', value: '1', checked: false },
    { id: 2, name: 'Second', value: '2', checked: false },
    { id: 3, name: 'Third', value: '3', checked: false },
    { id: 4, name: 'Fourth', value: '4', checked: false }
  ];

  public janDate: Date;
  public febDate: Date;
  public marchDate: Date;
  public aprDate: Date;
  public mayDate: Date;
  public juneDate: Date;
  public julDate: Date;
  public augDate: Date;
  public sepDate: Date;
  public octDate: Date;
  public novDate: Date;
  public decDate: Date;

  public selectYear: any;
  public startYear: string;
  public year: string;
  public mainErrorMsg = '';
  public dateValidationFlag = false;

  firstQuart: Array<CalenderModel> = [];
  secondQuart: Array<CalenderModel> = [];
  thirdQuart: Array<CalenderModel> = [];
  fourthQuart: Array<CalenderModel> = [];

  validationModel: ValidationModel = new ValidationModel();

  utilsObj: Utils = new Utils(this.datePipe);
  public startAt = null;
  public min = null;
  public max = null;
  constructor(public datePipe: DatePipe) {
    this.quarterlyModelArray.quarterlyModel = [];
  }



  ngOnInit() {
    this.startAt = new Date();
  }

  handleSelectYear(year: string) {
    this.year = year;
    this.startYear = year;
    this.selectYear = year;
    this.dateValidationFlag = false;
  }

  checkBoxChangeEvent(event) {
    if (this.startYear === undefined) {
      this.mainErrorMsg = 'Please select Year';
      this.dateValidationFlag = true;
      this.firstCheckBox = false;
      this.secondCheckBox = false;
      this.thirdCheckBox = false;
      this.fourCheckBox = false;
    } else {
     // console.log('value-->' + val);
      this.dateValidationFlag = false;
    }

    let val = event.target.value;
    let index = this.selectOption.findIndex((ds: any) => {
      return ds.id + '' === event.target.id;
    });
    this.selectedCheckBox = index;
    if (val === '1' && event.target.checked) {
      this.firstCheckBox = false;
    } else if (val === '1' && !event.target.checked) {
      this.firstCheckBox = true;
      // this.firstQuart = [];
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
    }

    if (val === '2' && event.target.checked) {
      this.secondCheckBox = false;

    } else if (val === '2' && !event.target.checked) {
      this.secondCheckBox = true;
    }

    if (val === '3' && event.target.checked) {
      this.thirdCheckBox = false;

    } else if (val === '3' && !event.target.checked) {
      this.thirdCheckBox = true;
    }

    if (val === '4' && event.target.checked) {
      this.fourCheckBox = false;

    } else if (val === '4' && !event.target.checked) {
      this.fourCheckBox = true;
    }
  }
  selectedOptions() { // right now: ['1','3']
    return this.selectOption
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  public getMonthFirstLastDay(year, month): any {
    let monthStartDay = new Date(year, month, 1);
    let monthEndDay = new Date(year, month + 1, 0);
    let min = this.utilsObj.formatDate(monthStartDay, 'dd');
    let max = this.utilsObj.formatDate(monthEndDay, 'dd');
    this.min = new Date(this.selectYear, month, Number.parseInt(min));
    this.max = new Date(this.selectYear, month, Number.parseInt(max));

  }

  getDateTimeEvent(val) {
    // this.selectYear = this.startAt.getFullYear();
    this.getMonthFirstLastDay(this.selectYear, val);
  }

  handleChange(event) {
    this.dateChanged.emit(this.quarterlyModelArray);
  }

  /*  checkUniqueCondition(id) {
        for (var a in this.quarterlyModelArray) {
       if (this.quarterlyModelArray[a].id == id.id) {
         this.quarterlyModelArray[a].quantity = this.quarterlyModelArray[a].quantity + id.quantity;
         return this.quarterlyModelArray[a];
       } else {
         return id
       }
     }
   } */

  prepareQuaterlyObj() {
    this.quarterlyModelArray.quarterlyModel = [];
    if (this.firstQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.firstQuart[0]);

    } if (this.secondQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.secondQuart[0]);

    }
    if (this.thirdQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.thirdQuart[0]);

    }
    if (this.fourthQuart.length > 0) {
      this.quarterlyModelArray.quarterlyModel.push(this.fourthQuart[0]);
    }
    // console.log("quarterlyModelArray" + JSON.stringify(this.quarterlyModelArray));
    this.handleChange(event);
  }

  clickMonthEvent(val) {
    if (val === 0) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.janDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 1) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.febDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 2) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.janDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      let jan = this.datePipe.transform(this.marchDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 3) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.juneDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.aprDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 4) {
      this.getDateTimeEvent(val);
      this.aprDate = null;
      this.juneDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.mayDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 5) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.aprDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.juneDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 6) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.julDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 7) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.augDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 8) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.julDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.sepDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val === 9) {
      this.getDateTimeEvent(val);
      this.decDate = null;
      this.novDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.octDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val == 10) {
      this.getDateTimeEvent(val);
      this.octDate = null;
      this.decDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.novDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    } else if (val == 11) {
      this.getDateTimeEvent(val);
      this.novDate = null;
      this.octDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      let apr = this.datePipe.transform(this.decDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      this.prepareQuaterlyObj();
    }
  }

}
