import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySubAdminsComponent } from './display-sub-admins.component';

describe('DisplaySubAdminsComponent', () => {
  let component: DisplaySubAdminsComponent;
  let fixture: ComponentFixture<DisplaySubAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySubAdminsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySubAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
