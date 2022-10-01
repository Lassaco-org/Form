import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveysOverviewComponent } from './admin-surveys-overview.component';

describe('AdminSurveysOverviewComponent', () => {
  let component: AdminSurveysOverviewComponent;
  let fixture: ComponentFixture<AdminSurveysOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveysOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSurveysOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
