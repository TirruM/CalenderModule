import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-onetimecalender',
  templateUrl: './onetimecalender.component.html',
  styleUrls: ['./onetimecalender.component.css']
})
export class OnetimecalenderComponent implements OnInit {

  selectedMoment : string;
  @Output() public dateChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
      this.dateChanged.emit(this.selectedMoment);
  }


}
