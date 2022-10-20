import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySubmitSuccessComponent } from './survey-submit-success.component';

describe('SurveySubmitSuccessComponent', () => {
  let component: SurveySubmitSuccessComponent;
  let fixture: ComponentFixture<SurveySubmitSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveySubmitSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveySubmitSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
