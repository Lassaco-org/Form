import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveyQuestionComponent } from './edit-survey-question.component';

describe('EditSurveyQuestionComponent', () => {
  let component: EditSurveyQuestionComponent;
  let fixture: ComponentFixture<EditSurveyQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSurveyQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSurveyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
