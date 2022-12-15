import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss'],
})
export class AddSurveyQuestionComponent implements OnInit {
  loading: boolean;
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isShareModal: boolean = false;
  formId: string = '';
  questionTypes = [
    {
      id: 1,
      title: 'Single Selection',
      description: 'Choose a single option',
      type: 'radio',
    },
    {
      id: 2,
      title: 'Multiple Selection',
      description: 'Choose multiple options',
      type: 'checkbox',
    },
    {
      id: 3,
      title: 'Short Answer',
      description: 'Type your response',
      type: 'text',
    },
  ];
  surveyForm: FormGroup;
  newSurveyData: any;
  surveyTitlePath: string = '';
  savedSurvey: any;
  localStorage_sections: any;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the title and descrp from localstorage if it exist
    this.newSurveyData = JSON.parse(localStorage.getItem('new-survey') || '[]');

    // Set title path
    this.surveyTitlePath = this.newSurveyData.title
      .replace(/\s/g, '-')
      .toLowerCase();

    // Survey form
    this.surveyForm = this.formBuilder.group({
      title: this.newSurveyData?.title,
      description: this.newSurveyData?.description,
      sections: this.formBuilder.array([this.newSection()]),
    });

    // this.savedSurvey = this.formService.getQuestionFieldFromLocalStorage();
    // Get Value from LOCAL STORAGE
    // this.localStorage_sections = JSON.parse(
    //   localStorage.getItem('survey-questions') || '[]'
    // );
    // if (
    //   this.localStorage_sections == null ||
    //   this.localStorage_sections.length === 0
    // ) {
    // } else {
    //   this.surveyForm.setControl(
    //     'sections',
    //     this.formBuilder.array(this.localStorage_sections.sections)
    //   );
    // }

    // if (this.savedSurvey === null || this.savedSurvey.length === 0) {
    //   // Save to localstorage
    //   // console.log();
    // }
    // this.formService.setItem(this.surveyForm.value);
    // if (
    //   localStorage_sections === null ||
    //   localStorage_sections.length === 0
    // ) {
    //   console.log('It empty');
    // } else {
    //   this.surveyForm.setControl(
    //     'sections',
    //     this.formBuilder.array(localStorage_sections.sections)
    //   );
    //   // this.surveyForm.patchValue({
    //   //   sections: localStorage_sections.sections,
    //   // });

    //   console.log(this.surveyForm.value);
    // }
  }

  // Get survey
  sections(): FormArray {
    return this.surveyForm.get('sections') as FormArray;
  }

  // Set section payload
  newSection() {
    return this.formBuilder.group({
      sectionTitle: ['Section', [Validators.required]],
      questions: this.formBuilder.array([this.newQuestion()]),
    });
  }

  // Add section
  addSection() {
    this.sections().push(this.newSection());
    this.showAlert('Section added', 'success');

    // Save to localstorage
    this.formService.setItem(this.surveyForm.value);
  }

  // Remove Section
  removeSection(sectionIndex: number) {
    if (this.sections().length !== 1) {
      this.sections().removeAt(sectionIndex);
      this.showAlert('Section removed', 'success');

      // Save to localstorage
      this.formService.setItem(this.surveyForm.value);
    } else {
      this.deleteWarning();
    }
  }

  // Get Section questions
  sectionQuestions(sectionIndex: number): FormArray {
    return this.sections().at(sectionIndex).get('questions') as FormArray;
  }

  // Set Question payload
  newQuestion() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['radio', [Validators.required]],
      required: [false, [Validators.required]],
      options: this.formBuilder.array([this.newOption()]),
    });
  }

  // Add question
  addQuestion(sectionIndex: number) {
    this.sectionQuestions(sectionIndex).push(this.newQuestion());
    this.showAlert('Question added', 'success');

    // Save to localstorage
    this.formService.setItem(this.surveyForm.value);
  }

  // Remove section question
  removeQuestion(sectionIndex: number, questionIndex: number) {
    if (this.sectionQuestions(sectionIndex).length !== 1) {
      this.sectionQuestions(sectionIndex).removeAt(questionIndex);
      this.showAlert('Question removed', 'success');

      // Save to localstorage
      this.formService.setItem(this.surveyForm.value);
    } else {
      this.deleteWarning();
    }
  }

  // Get Section question options
  sectionQuestionOptions(
    sectionIndex: number,
    questionIndex: number
  ): FormArray {
    return (this.sections().at(sectionIndex).get('questions') as FormArray)
      .at(questionIndex)
      .get('options') as FormArray;
  }

  // Set Option payload
  newOption() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  // Add option
  addOption(sectionIndex: any, questionIndex: any) {
    this.sectionQuestionOptions(sectionIndex, questionIndex).push(
      this.newOption()
    );
    this.showAlert('Option added', 'success');

    // Save to localstorage
    this.formService.setItem(this.surveyForm.value);
  }

  // Remove section question option
  removeOption(
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number
  ) {
    if (this.sectionQuestionOptions(sectionIndex, questionIndex).length !== 1) {
      this.sectionQuestionOptions(sectionIndex, questionIndex).removeAt(
        optionIndex
      );
      this.showAlert('Option removed', 'success');

      // Save to localstorage
      this.formService.setItem(this.surveyForm.value);
    } else {
      this.deleteWarning();
    }
  }

  // Save survey
  onSave() {
    this.loading = true;

    this.formService
      .addForm(this.surveyForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          this.showAlert(res.message, 'success');
          console.log(res);

          // Stop loading
          this.loading = false;

          if(res.message === "Form created successfully") {

            setTimeout(() => {
              // Route to admin surveys page
              this.router.navigate(['/admin/surveys']);
            }, 3000);

          }


          // Reset form
          // this.surveyForm.reset();
          // if (res.message === 'Form added successfully') {
          // }
        },
        error: (e) => {
          console.error(e.message);

          // Show error message
          this.showAlert(e.message, 'error');

          // Set loading to false
          this.loading = false;
        },
      });
  }

  // On Select
  selectItem(questionType: any, questionFieldIndex: any, questionIndex: any) {
    console.log(questionType);
  }

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

  // Delete warning
  deleteWarning() {
    this.showAlert('You cant delete last field', 'warning');
  }

  // Open share modal
  openShareModal(formId: any) {
    this.formId = formId;
    this.isShareModal = true;
  }

  // close share modal
  closeShareModal() {
    this.isShareModal = false;
  }

  // Preview survey
  previewSurvey() {
    // Save to localstorage
    this.formService.setItem(this.surveyForm.value);

    // Route to preview page
    this.router.navigate([`/surveys/${this.surveyTitlePath}/survey-preview`]);
  }
}
