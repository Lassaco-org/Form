import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss'],
})
export class CreateSurveyComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;
  // hide: boolean = true;
  alertColor: string = '';
  newSurveyData: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Get the title and descrp from localstorage if it exist
    this.newSurveyData = JSON.parse(localStorage.getItem('new-survey') || '[]');

    // User form
    this.userForm = this.formBuilder.group({
      title: [
        this.newSurveyData.title !== null ? this.newSurveyData.title : '',
        [Validators.required],
      ],
      description: [
        this.newSurveyData.description !== null
          ? this.newSurveyData.description
          : '',
        [Validators.required, Validators.minLength(50)],
      ],
    });
  }

  // Create survey
  createSurvey() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    // Set item to Local storage
    localStorage.setItem('new-survey', JSON.stringify(this.userForm.value));

    // Route user
    this.router.navigate(['/admin/add-questions']);
  }
}
