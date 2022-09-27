import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySurveyResponsesComponent } from './display-survey-responses.component';

describe('DisplaySurveyResponsesComponent', () => {
  let component: DisplaySurveyResponsesComponent;
  let fixture: ComponentFixture<DisplaySurveyResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySurveyResponsesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySurveyResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
