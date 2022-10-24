import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-survey-section',
  templateUrl: './survey-section.component.html',
  styleUrls: ['./survey-section.component.scss'],
})
export class SurveySectionComponent implements OnInit {
  selectedDropdownValue: string = '';
  selectedDropdownType: string = 'radio';
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
  questionFields: any;
  alertMessage: string = '';
  isAlert: boolean = false;
  alertColor: string = '';
  // @Output() hi: EventEmitter<any> = new EventEmitter();
  @Input() isSaveSurvey: boolean;
  surveyForm: FormGroup;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Fetch question fields then add new if null
    this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    // if (this.questionFields === null || this.questionFields.length === 0) {
    //   let payload = {
    //     section: [
    //       {
    //         name: 'Question 1',
    //         type: 'radio',
    //         options: [
    //           {
    //             name: 'Option 1',
    //           },
    //         ],
    //         number: '1',
    //         required: false,
    //         sectionName: '',
    //       },
    //     ],
    //   };
    //   this.formService.addSectionToLocalStorage(payload.section);

    //   this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    // }
  }

  // String.fromCharCode('a'.charCodeAt(0) + 1)
  questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  newQuestion(): FormGroup {
    return this.formBuilder.group({
      name: '',
      type: 'radio',
      options: this.formBuilder.array([]),
      number: '',
      required: true,
      sectionName: '',
    });
  }

  addQuestion() {
    this.questions().push(this.newQuestion());
  }

  removeQuestion(surIndex: number) {
    this.questions().removeAt(surIndex);
  }

  questionOptions(surIndex: number): FormArray {
    return this.questions().at(surIndex).get('skills') as FormArray;
  }

  newOption(): FormGroup {
    return this.formBuilder.group({
      name: '',
      grade: '',
    });
  }

  addQuestionOption(surIndex: number, del: any) {
    this.questionOptions(surIndex).push(this.newOption());
  }

  removeQuestionOption(surIndex: number, optionIndex: number, del: any) {
    this.questionOptions(surIndex).removeAt(optionIndex);
  }

  onSubmit() {
    console.log(this.surveyForm.value);
  }
  saveSurvey() {}

  // On Select
  // selectItem(questionType: any, questionFieldIndex: any, questionIndex: any) {
  //   this.questionFields.forEach((e: any, index: any) => {
  //     if (index === questionFieldIndex) {
  //       e.forEach((o: any, index: any) => {
  //         if (index === questionIndex) {
  //           o.type = questionType.type;

  //           this.formService.setItem(this.questionFields);
  //           this.ngOnInit();
  //         }
  //       });
  //     }
  //   });
  // }

  // Add Section
  // addSection() {
  //   let payload = {
  //     section: [
  //       {
  //         name: 'Question 1',
  //         type: 'radio',
  //         options: [
  //           {
  //             name: 'Option 1',
  //           },
  //         ],
  //         number: '1',
  //         required: false,
  //         sectionName: '',
  //       },
  //     ],
  //   };

  //   this.formService.addSectionToLocalStorage(payload.section);
  //   this.showAlert('Section added', 'success');

  //   // this.ngOnInit();
  // }

  // Remove section
  // removeSection(questionFieldIndex: any) {
  //   this.questionFields.splice(questionFieldIndex, 1);
  //   this.formService.setItem(this.questionFields);

  //   this.showAlert('Section removed', 'success');

  //   this.ngOnInit();
  // }

  // Add Question Field
  // addQuestion(questionFieldIndex: any) {
  //   this.questionFields.forEach((e: any, index: any) => {
  //     if (index === questionFieldIndex) {
  //       e.push({
  //         name: `Question ${e.length + 1}`,
  //         type: 'radio',
  //         options: [
  //           {
  //             name: 'Option 1',
  //           },
  //         ],
  //         number: `${e.length + 1}`,
  //         required: false,
  //         sectionName: '',
  //       });

  //       this.formService.setItem(this.questionFields);
  //       this.ngOnInit();
  //     }
  //   });

  //   this.showAlert('Question field added', 'success');
  // }

  // remove Question Field
  // removeQuestionField(questionFieldIndex: any, questionIndex: any) {
  //   this.questionFields.forEach((e: any, index: any) => {
  //     if (index === questionFieldIndex) {
  //       e.splice(questionIndex, 1);
  //       this.formService.setItem(this.questionFields);
  //       if (e.length === 0) {
  //         this.removeSection(questionFieldIndex);
  //       }
  //       this.showAlert('Question field removed', 'success');

  //       this.ngOnInit();
  //     }
  //   });
  // }

  // Add Question option
  // addQuestionOption(questionFieldIndex: any, questionIndex: any) {
  //   this.questionFields.forEach((e: any, index: any) => {
  //     if (index === questionFieldIndex) {
  //       e.forEach((o: any, index: any) => {
  //         if (index === questionIndex) {
  //           o.options.push({
  //             name: `Option ${o.options.length + 1}`,
  //           });
  //         }
  //       });
  //       this.formService.setItem(this.questionFields);
  //       this.showAlert('Option field added', 'success');

  //       this.ngOnInit();
  //     }
  //   });
  // }

  // // remove Question option
  // removeQuestionOption(
  //   questionFieldIndex: any,
  //   questionIndex: any,
  //   optionIndex: any
  // ) {
  //   this.questionFields.forEach((e: any, index: any) => {
  //     if (index === questionFieldIndex) {
  //       e.forEach((o: any, index: any) => {
  //         if (index === questionIndex && o.options.length !== 1) {
  //           o.options.splice(optionIndex, 1);
  //         }
  //       });
  //       this.formService.setItem(this.questionFields);
  //       this.showAlert('Option removed', 'success');

  //       this.ngOnInit();
  //     }
  //   });
  // }

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
}
