import { EveryDayModel } from './../models/everydaymodel';
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
  public weeksDays: boolean = false;
  public govholiyDays: boolean = false;

  everDayModel: EveryDayModel = <EveryDayModel>{};

  @Output() public dateChanged = new EventEmitter();

  handleChange(event) {
    console.log("handle change");
    this.everDayModel.startDate = this.startDate;
    this.everDayModel.endDate = this.endDate;
    this.everDayModel.weeksDays = this.weeksDays;
    this.everDayModel.govHolidays = this.govholiyDays;

    this.dateChanged.emit(this.everDayModel)
  }

  onWeekdaysChange() {
    this.weeksDays = !this.weeksDays;
    this.handleChange(event); 
    }
    
    onGovHolidaysChange() {
    this.govholiyDays = !this.govholiyDays;
    this.handleChange(event); 
    }

  constructor(public datepipe: DatePipe) { }

  ngOnInit() {

  }

  /* saveDates(event){
     var ScalDate = new Date(this.startdate);
     var Syear = ScalDate.getFullYear();
     var Smonth = ScalDate.getMonth()+1;
     var Sdate  = ScalDate.getDate();
 
     var EcalDate = new Date(this.enddate);
     var Eyear = EcalDate.getFullYear();
     var Emonth = EcalDate.getMonth()+1;
     var Edate  = EcalDate.getDate();
 
 
     var diff = Math.abs(this.startdate.getTime() - this.enddate.getTime());
 var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
 let data=[];
 
 for (var i=0; i<diffDays; i++) {
   let calenderModel1 = new CalenderModel();
     var sDate = 
 calenderModel1.start_date = this.datepipe.transform(this.selectedDate, 'dd-MM-yyyy');
 calenderModel1.end_date = this.datepipe.transform(this.selectedDate, 'dd-MM-yyyy');
 let calArr= [];
 calArr.push(calenderModel1);
 
   data.push(i);
 }
 
 var weekdays = diffDays/7;
 console.log("Diff Days::::",diffDays);
 console.log("weekdays:::",weekdays);
 console.log("NoOfWeekDays",weekdays*2); 
 
     var noOfDays = Edate-Sdate;
    
     console.log("noOfDays",diffDays);
     
 
   }
 
   daysbetweendates(){
     let getDates = function(startDate, endDate) {
         let dates = [],
       currentDate = startDate,
       addDays = function(days) {
         let date = new Date(this.valueOf());
         date.setDate(date.getDate() + days);
         return date;
       };
       while (currentDate <= endDate) {
     dates.push(currentDate);
     currentDate = addDays.call(currentDate, 1);
     }
   return dates;
   };
 
   // Usage
   let dates = getDates(new Date(2013,10,22), new Date(2013,11,25));                                                                                                           
   dates.forEach(function(date) 
   {
   console.log(date);
   });
   }*/

}
