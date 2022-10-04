import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss'],
})
export class AddSurveyQuestionComponent implements OnInit {
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
  allForms: any;
  questionOptionFields: any[] = [
    {
      value: 'Option 1',
    },
  ];
  questionFields: any;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Get All Admins
    this.formService.getForms().subscribe({
      next: (res: any) => {
        this.allForms = res.data.docs;
        console.log(res.data.docs);
      },
      error: (e) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
    });

    // Fetch question fields then add new if null
    this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    if (this.questionFields === null || this.questionFields.length === 0) {
      this.formService.addQuestionFieldToLocalStorage({
        id: 1,
        value: 'Question 1',
        type: 'radio',
        questionOptionFields: [
          {
            value: 'Option 1',
          },
        ],
      });

      this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    }
  }

  // On Select
  selectItem(val: any, questionField: any) {
    let payload = {
      id: questionField.id,
      value: questionField.value,
      type: val.type,
      questionOptionFields: questionField.questionOptionFields,
    };

    let allData = this.questionFields.map((s: any) =>
      s.id !== payload.id ? s : payload
    );
    localStorage.removeItem('survey-question');
    // console.log('users -> ', users);
    this.formService.addQuestionOptionsFieldToLocalStorage(allData);
    this.ngOnInit();
  }

  // Add Question Field
  addQuestionField() {
    let payload = {
      id: this.questionFields.length + 1,
      value: `Question ${this.questionFields.length + 1}`,
      type: 'radio',
      questionOptionFields: [
        {
          value: 'Option 1',
        },
      ],
    };
    this.formService.addQuestionFieldToLocalStorage(payload);

    this.ngOnInit();
  }

  // remove Question Field
  removeQuestionField(i: any) {
    // this.questionFields.splice(i, 1);
    this.formService.removeQuestionFieldToLocalStorage(i);

    this.ngOnInit();
  }

  // Add Question option
  addQuestionOption(questionId: any) {
    this.questionFields.forEach((e: any) => {
      if (e.id === questionId) {
        e.questionOptionFields.push({
          value: `Option ${e.questionOptionFields.length + 1}`,
        });
      }
    });
    this.formService.addQuestionOptionsFieldToLocalStorage(this.questionFields);
    this.ngOnInit();
  }

  // remove Question option
  removeQuestionOption(questionIndex: any, optionIndex: any) {
    this.formService.removeQuestionOptionsFieldToLocalStorage(
      questionIndex,
      optionIndex
    );
    this.ngOnInit();
  }
}
