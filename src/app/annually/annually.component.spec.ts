import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuallyComponent } from './annually.component';

describe('AnnuallyComponent', () => {
  let component: AnnuallyComponent;
  let fixture: ComponentFixture<AnnuallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
