import { QuaterlyModel } from './../models/quaterlymodel';
import { CalenderModel } from './../models/calender';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-quarterly',
  templateUrl: './quarterly.component.html',
  styleUrls: ['./quarterly.component.css']
})
export class QuarterlyComponent implements OnInit {
  selectedCheckBox: number = 0;
  firstCheckBox: boolean = true;
  secondCheckBox: boolean = true;
  thirdCheckBox: boolean = true;
  fourCheckBox: boolean = true;
  quaterlyModelArray: QuaterlyModel = <QuaterlyModel>{};

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
  firstQuart: Array<CalenderModel> = [];
  secondQuart: Array<CalenderModel> = [];
  thirdQuart: Array<CalenderModel> = [];
  fourthQuart: Array<CalenderModel> = [];



  public startAt = new Date(2018, 3, 18, 10, 30);

  // Min moment: April 12 2018, 10:30
  public min = new Date(2018, 3, 12, 10, 30);

  // Max moment: April 25 2018, 20:30
  public max = new Date(2018, 3, 25, 20, 30);
  constructor(public datepipe: DatePipe) {
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
    //console.log(val);
    //console.log(event.target.checked);
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
      // this.secondQuart = [];
    }

    if (val === '3' && event.target.checked) {
      this.thirdCheckBox = false;

    } else if (val === '3' && !event.target.checked) {
      this.thirdCheckBox = true;
      // this.thirdQuart = [];
    }

    if (val === '4' && event.target.checked) {
      this.fourCheckBox = false;

    } else if (val === '4' && !event.target.checked) {
      this.fourCheckBox = true;
      //this.fourthQuart = [];
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
    var min = this.datepipe.transform(monthStartDay, 'dd');
    var max = this.datepipe.transform(monthEndDay, 'dd');

    this.min = new Date(this.selectYear, month, Number.parseInt(min));
    this.max = new Date(this.selectYear, month, Number.parseInt(max));
    //console.log("min::" + min + "max:::" + max);
  }

  getDateTimeEvent(val) {
    this.selectYear = this.startAt.getFullYear();
    this.getMonthFirstLastDay(this.selectYear, val);
  }

  handleChange(event) {
    console.log("handle change");
    this.dateChanged.emit(this.quaterlyModelArray);
  }

  /*  checkUniqueCondition(id) {
        for (var a in this.quaterlyModelArray) {
       if (this.quaterlyModelArray[a].id == id.id) {
         this.quaterlyModelArray[a].quantity = this.quaterlyModelArray[a].quantity + id.quantity;
         return this.quaterlyModelArray[a];
       } else {
         return id
       }
     }
   } */

  prepareQuaterlyObj() {
    this.quaterlyModelArray.quaterlyModel = [];
    if (this.firstQuart.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.firstQuart[0]);

    } if (this.secondQuart.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.secondQuart[0]);

    }
    if (this.thirdQuart.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.thirdQuart[0]);

    }
    if (this.fourthQuart.length > 0) {
      this.quaterlyModelArray.quaterlyModel.push(this.fourthQuart[0]);

    }

    console.log("quaterlyModelArray" + JSON.stringify(this.quaterlyModelArray));
    this.handleChange(event);


  }

  clickMonthEvent(val) {
    if (val == 0) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      var jan = this.datepipe.transform(this.janDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);


      this.prepareQuaterlyObj();



    } else if (val == 1) {
      this.getDateTimeEvent(val);
      this.janDate = null;
      this.marchDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      var jan = this.datepipe.transform(this.febDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;

      this.firstQuart.push(calenderModel1);


      this.prepareQuaterlyObj();
    } else if (val == 2) {
      this.getDateTimeEvent(val);
      this.febDate = null;
      this.janDate = null;
      this.firstQuart = [];

      let calenderModel1 = new CalenderModel();
      var jan = this.datepipe.transform(this.marchDate, 'yyyy-MM-dd');
      calenderModel1.start_date = jan;
      calenderModel1.end_date = jan;
      this.firstQuart.push(calenderModel1);


      this.prepareQuaterlyObj();
    } else if (val == 3) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.juneDate = null;
      this.secondQuart = [];

      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.aprDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);

      this.prepareQuaterlyObj();
    } else if (val == 4) {
      this.getDateTimeEvent(val);
      this.aprDate = null;
      this.juneDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.mayDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);

      this.prepareQuaterlyObj();
    } else if (val == 5) {
      this.getDateTimeEvent(val);
      this.mayDate = null;
      this.aprDate = null;
      this.secondQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.juneDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.secondQuart.push(calenderModel1);

      this.prepareQuaterlyObj();
    } else if (val == 6) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.sepDate = null;

      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.julDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      this.prepareQuaterlyObj();

    } else if (val == 7) {
      this.getDateTimeEvent(val);
      this.julDate = null;
      this.sepDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.augDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      console.log(JSON.stringify(this.thirdQuart));
      this.prepareQuaterlyObj();
    } else if (val == 8) {
      this.getDateTimeEvent(val);
      this.augDate = null;
      this.julDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.sepDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.thirdQuart.push(calenderModel1);
      console.log(JSON.stringify(this.thirdQuart));
      this.prepareQuaterlyObj();
    } else if (val == 9) {
      this.getDateTimeEvent(val);
      this.decDate = null;
      this.novDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.octDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      console.log(JSON.stringify(this.fourthQuart));
      this.prepareQuaterlyObj();
    } else if (val == 10) {
      this.getDateTimeEvent(val);
      this.octDate = null;
      this.decDate = null;
      this.fourthQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.novDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      console.log(JSON.stringify(this.fourthQuart));
      this.prepareQuaterlyObj();
    } else if (val == 11) {
      this.getDateTimeEvent(val);
      this.novDate = null;
      this.octDate = null;
      this.thirdQuart = [];
      let calenderModel1 = new CalenderModel();
      var apr = this.datepipe.transform(this.decDate, 'yyyy-MM-dd');
      calenderModel1.start_date = apr;
      calenderModel1.end_date = apr;
      this.fourthQuart.push(calenderModel1);
      console.log(JSON.stringify(this.fourthQuart));
      this.prepareQuaterlyObj();
    }
  }

}