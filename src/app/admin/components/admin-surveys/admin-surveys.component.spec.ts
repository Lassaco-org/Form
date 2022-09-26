import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSurveysComponent } from './admin-surveys.component';

describe('AdminSurveysComponent', () => {
  let component: AdminSurveysComponent;
  let fixture: ComponentFixture<AdminSurveysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSurveysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
