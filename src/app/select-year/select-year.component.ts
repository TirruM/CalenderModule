import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.css']
})
export class SelectYearComponent implements OnInit {
  selectYears: any[] = [];
  public selectYearValide = true;

  public startYear = 1970;
  public endYear = 2040;


  private getYears() {
    this.selectYears = [];
    for (let i = this.startYear; i < this.endYear; i++) {
      this.selectYears.push(i);
    }
  }

  constructor() { }
  ngOnInit() {
    this.getYears();
  }

  @Output() public yearsChanged = new EventEmitter();

  handleSelectYear(event) {
    this.yearsChanged.emit(event.target.value);
  }
}
