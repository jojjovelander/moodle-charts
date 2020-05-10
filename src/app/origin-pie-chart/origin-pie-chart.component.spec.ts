import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginPieChartComponent } from './origin-pie-chart.component';

describe('OriginPieChartComponent', () => {
  let component: OriginPieChartComponent;
  let fixture: ComponentFixture<OriginPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
