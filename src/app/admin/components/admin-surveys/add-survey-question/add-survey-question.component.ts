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
      let payload = {
        section: [
          {
            name: 'Question 1',
            type: 'radio',
            options: [
              {
                name: 'Option 1',
              },
            ],
            number: '1',
            required: false,
            sectionName: '',
          },
        ],
      };
      this.formService.addSectionToLocalStorage(payload);

      this.questionFields = this.formService.getQuestionFieldFromLocalStorage();
    }
  }

  // String.fromCharCode('a'.charCodeAt(0) + 1)

  // On Select
  selectItem(questionType: any, questionFieldIndex: any, questionIndex: any) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionFieldIndex) {
        e.forEach((o: any, index: any) => {
          if (index === questionIndex) {
            o.type = questionType.type;

            this.formService.setItem(this.questionFields);
            this.ngOnInit();
          }
        });
      }
    });
  }

  // Add Section
  addSection() {
    let payload = {
      section: [
        {
          name: 'Question 1',
          type: 'radio',
          options: [
            {
              name: 'Option 1',
            },
          ],
          number: '1',
          required: false,
          sectionName: '',
        },
      ],
    };

    this.formService.addSectionToLocalStorage(payload.section);
    this.ngOnInit();
  }

  // Remove section
  removeSection(questionFieldIndex: any) {
    this.questionFields.splice(questionFieldIndex, 1);
    this.formService.setItem(this.questionFields);
    this.ngOnInit();
  }

  // Add Question Field
  addQuestion(questionFieldIndex: any) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionFieldIndex) {
        e.push({
          name: `Question ${e.length + 1}`,
          type: 'radio',
          options: [
            {
              name: 'Option 1',
            },
          ],
          number: `${e.length + 1}`,
          required: false,
          sectionName: '',
        });

        this.formService.setItem(this.questionFields);
        this.ngOnInit();
      }
    });
  }

  // remove Question Field
  removeQuestionField(questionFieldIndex: any, questionIndex: any) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionFieldIndex) {
        e.splice(questionIndex, 1);
        this.formService.setItem(this.questionFields);
        if (e.length === 0) {
          this.removeSection(questionFieldIndex);
        }
        this.ngOnInit();
      }
    });
  }

  // Add Question option
  addQuestionOption(questionFieldIndex: any, questionIndex: any) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionFieldIndex) {
        e.forEach((o: any, index: any) => {
          if (index === questionIndex) {
            o.options.push({
              name: `Option ${o.options.length + 1}`,
            });
          }
        });
        this.formService.setItem(this.questionFields);
        this.ngOnInit();
      }
    });
  }

  // remove Question option
  removeQuestionOption(
    questionFieldIndex: any,
    questionIndex: any,
    optionIndex: any
  ) {
    this.questionFields.forEach((e: any, index: any) => {
      if (index === questionFieldIndex) {
        e.forEach((o: any, index: any) => {
          if (index === questionIndex && o.options.length !== 1) {
            o.options.splice(optionIndex, 1);
          }
        });
        this.formService.setItem(this.questionFields);
        this.ngOnInit();
      }
    });
  }

  saveSurvey() {
    this.questionFields.forEach((e: any, index: any) => {
      e.map((questionField: any) => ({
        '1': questionField[index],
      }));
      console.log(this.questionFields);
    });

    // let payload = {
    //   titlle: 'Lasaco Survey 1',
    //   questions: this.questionFields.forEach((s: any) => {
    //     console.log(s);
    //     s.map((e: any) => ({
    //       '1': this.questionFields,
    //     }));
    //   }),
    // };
    // console.log(payload);
    // console.log(this.questionFields);
  }
}
