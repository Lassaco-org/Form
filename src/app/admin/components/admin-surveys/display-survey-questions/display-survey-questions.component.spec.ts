import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySurveyQuestionsComponent } from './display-survey-questions.component';

describe('DisplaySurveyQuestionsComponent', () => {
  let component: DisplaySurveyQuestionsComponent;
  let fixture: ComponentFixture<DisplaySurveyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySurveyQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySurveyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
