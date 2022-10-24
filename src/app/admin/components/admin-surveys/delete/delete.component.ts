import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  // selectedDropdownValue: string = '';
  // selectedDropdownType: string = 'radio';
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
  alertMessage: string = '';
  isAlert: boolean = false;
  alertColor: string = '';
  surveyForm: FormGroup;
  // survey: any;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.formBuilder.group({
      title: 'Survey title',
      description: 'Survey description',
      sections: this.formBuilder.array([this.newSection()]),
    });

    console.log(this.surveyForm.value);
  }

  // Get survey
  sections(): FormArray {
    return this.surveyForm.get('sections') as FormArray;
  }

  // Set section payload
  newSection() {
    return this.formBuilder.group({
      sectionTitle: ['', [Validators.required]],
      questions: this.formBuilder.array([this.newQuestion()]),
    });
  }

  // Add section
  addSection() {
    this.sections().push(this.newSection());
    this.showAlert('Section added', 'success');
  }

  // Remove Section
  removeSection(sectionIndex: number) {
    if (this.sections().length !== 1) {
      this.sections().removeAt(sectionIndex);
      this.showAlert('Section removed', 'success');
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
      number: ['1', [Validators.required]],
      required: [false, [Validators.required]],
      options: this.formBuilder.array([this.newOption()]),
    });
  }

  // Add question
  addQuestion(sectionIndex: number) {
    this.sectionQuestions(sectionIndex).push(this.newQuestion());
    this.showAlert('Question added', 'success');
  }

  // Remove section question
  removeQuestion(sectionIndex: number, questionIndex: number) {
    if (this.sectionQuestions(sectionIndex).length !== 1) {
      this.sectionQuestions(sectionIndex).removeAt(questionIndex);
      this.showAlert('Question removed', 'success');
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
      grade: [0, [Validators.required]],
    });
  }

  // Add option
  addOption(sectionIndex: any, questionIndex: any) {
    this.sectionQuestionOptions(sectionIndex, questionIndex).push(
      this.newOption()
    );
    this.showAlert('Option added', 'success');
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
    } else {
      this.deleteWarning();
    }
  }

  // Save survey
  onSave() {
    console.log(this.surveyForm.value);
  }

  // On Select
  selectItem(questionType: any, questionFieldIndex: any, questionIndex: any) {
    console.log(questionType);

    // this.survequestions.forEach((e: any, index: any) => {
    //   if (index === questionFieldIndex) {
    //     e.forEach((o: any, index: any) => {
    //       if (index === questionIndex) {
    //         o.type = questionType.type;
    //         this.formService.setItem(this.survequestions);
    //         this.ngOnInit();
    //       }
    //     });
    //   }
    // });
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
}
