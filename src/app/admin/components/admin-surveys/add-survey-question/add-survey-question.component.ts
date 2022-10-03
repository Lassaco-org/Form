import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss'],
})
export class AddSurveyQuestionComponent implements OnInit {
  isDropDown: boolean = false;
  selectedDropdownValue: string = '';
  selectedDropdownType: string = 'Radio';
  questionTypes = [
    {
      id: 1,
      title: 'Single Selection',
      description: 'Choose the single option',
      type: 'Radio',
    },
    {
      id: 2,
      title: 'Multiple Selection',
      description: 'Choose multiple options',
      type: 'Checkbox',
    },
    {
      id: 3,
      title: 'Short Answer',
      description: 'Type your response',
      type: 'Text',
    },
    // {
    //   id: 4,
    //   title: 'True or False',
    //   description: 'Decide if a statment is true or false',
    // },
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
        console.log(res);
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
        value: 'Question 1',
        questionOptionFields: [
          {
            value: 'Option 1',
          },
        ],
      });

      this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    }
  }

  // Toggle Dropdown
  toggleDropdown(i: any) {
    this.isDropDown = !this.isDropDown;
  }

  // On Select
  selectItem(val: any) {
    // Set selected value
    this.selectedDropdownValue = val.title;
    // Set selected type
    this.selectedDropdownType = val.type;

    // Close Dropdown on Select
    this.isDropDown = false;
  }

  // remove Question option
  removeQuestionField(i: any) {
    // this.questionFields.splice(i, 1);
    this.formService.removeQuestionFieldToLocalStorage(i);

    this.ngOnInit();
  }

  // remove Question option
  addQuestionField() {
    let payload = {
      value: `Question ${this.questionFields.length + 1}`,
      questionOptionFields: [
        {
          value: 'Option 1',
        },
      ],
    };
    this.formService.addQuestionFieldToLocalStorage(payload);

    this.ngOnInit();
  }

  // Add Question option
  addQuestionOption(questionindex: any) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionindex) {
        e.questionOptionFields.push({
          value: `Option ${e.questionOptionFields.length + 1}`,
        });
      }
    });
    this.formService.addQuestionOptionsFieldToLocalStorage(
      this.questionFields,
      questionindex
    );
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
