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
    //console.log("handle change");
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

}
