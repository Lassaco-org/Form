import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyEditPreviewComponent } from './survey-edit-preview.component';

describe('SurveyEditPreviewComponent', () => {
  let component: SurveyEditPreviewComponent;
  let fixture: ComponentFixture<SurveyEditPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyEditPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyEditPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
