import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieReportComponent } from './pie-report.component';

describe('PieReportComponent', () => {
  let component: PieReportComponent;
  let fixture: ComponentFixture<PieReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
