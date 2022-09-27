import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSurveyQuestionComponent } from './add-survey-question.component';

describe('AddSurveyQuestionComponent', () => {
  let component: AddSurveyQuestionComponent;
  let fixture: ComponentFixture<AddSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSurveyQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
