import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CalenderModel } from './../models/calender';
import { QuaterlyModel } from './../models/quaterlymodel';

@Component({
  selector: 'app-halfyearly',
  templateUrl: './halfyearly.component.html',
  styleUrls: ['./halfyearly.component.css']
})
export class HalfyearlyComponent implements OnInit {
  selectedCheckBox: number = 0;
  firstCheckBox: boolean = true;
  secondCheckBox: boolean = true;
  selectOption: any[] = [
    { id: 1, name: 'First', value: '1', checked: false },
    { id: 2, name: 'Second', value: '2', checked: false }
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

  quaterlyModelArray: QuaterlyModel = <QuaterlyModel>{};
  firstHalfyearly: Array<CalenderModel> = [];
  secondHalfyearly: Array<CalenderModel> = [];

  @Output() public dateChanged = new EventEmitter();


  public startAt = new Date(2018, 3, 18, 10, 30);

  // Min moment: April 12 2018, 10:30
  public min = new Date(2018, 3, 12, 10, 30);

  // Max moment: April 25 2018, 20:30
  public max = new Date(2018, 3, 25, 20, 30);

  constructor(public datePipe: DatePipe) {
    this.quaterlyModelArray.quaterlyModel = [];
  }

  ngOnInit() {
    this.startAt = new Date();
  }


  checkBoxChangeEvent(event) {
    var val = event.target.value;
    var index = this.selectOption.findIndex((ds: any) => {
      return ds.id + "" === event.target.id;
    });
    this.selectedCheckBox = index;
    // console.log(val);
    // console.log(event.target.checked);
    if (val === '1' && event.target.checked) {
      this.firstCheckBox = false;
    } else if (val === '1' && !event.target.checked) {
      this.firstCheckBox = true;
    }

    if (val === '2' && event.target.checked) {
      this.secondCheckBox = false;
    } else if (val === '2' && !event.target.checked) {
      this.secondCheckBox = true;
    }
  }

  selectedOptions() { // right now: ['1','3']
    return this.selectOption
      .filter(opt => opt.checked)
      .map(opt => opt.value)
  }

  public getMonthFirstLastDay(year, month): any {
    //console.log("month" + month);
    var monthStartDay = new Date(year, month, 1);
    var monthEndDay = new Date(year, month + 1, 0);
    var min = this.datePipe.transform(monthStartDay, 'dd');
    var max = this.datePipe.transform(monthEndDay, 'dd');

    this.min = new Date(this.selectYear, month, Number.parseInt(min));
    this.max = new Date(this.selectYear, month, Number.parseInt(max));
    //console.log("min::" + min + "max:::" + max);
  }

  getDateTimeEvent(val) {
    this.selectYear = this.startAt.getFullYear();
    this.getMonthFirstLastDay(this.selectYear, val);
  }

  handleChange(event) {
    //console.log("Half handle change");
    this.dateChanged.emit(this.quaterlyModelArray);
  }

  prepareQuaterlyObj() {
    this.quaterlyModelArray.quaterlyModel = [];
    if (this.firstHalfyearly.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.firstHalfyearly[0]);
    }
    if (this.secondHalfyearly.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.secondHalfyearly[0]);
    }
    //console.log("halfYearlyModelArray" + JSON.stringify(this.quaterlyModelArray));
    this.handleChange(event);
  }

  clickMonthEvent(val) {
    if (val == 0) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.janDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();


    } else if (val == 1) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.febDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 2) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.aprDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.marchDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 3) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.mayDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.aprDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 4) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.juneDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.mayDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 5) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.febDate = null;
      this.marchDate = null;
      this.aprDate = null;
      this.mayDate = null;

      this.firstHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.juneDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 6) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.sepDate = null;
      this.octDate = null;
      this.novDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.julDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 7) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.augDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 8) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.novDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.sepDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 9) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.octDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 10) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.octDate = null;
      this.decDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.novDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 11) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.augDate = null;
      this.sepDate = null;
      this.novDate = null;
      this.octDate = null;

      this.secondHalfyearly = [];
      let calenderModel1 = new CalenderModel();
      var jan = this.datePipe.transform(this.decDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.secondHalfyearly.push(calenderModel1);
      this.prepareQuaterlyObj();

    }
  }
}
