import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterReportComponent } from './scatter-report.component';

describe('ScatterReportComponent', () => {
  let component: ScatterReportComponent;
  let fixture: ComponentFixture<ScatterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScatterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
