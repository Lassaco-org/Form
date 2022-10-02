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
  selectedDropdownType: string = '';
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
      type: 'Input',
    },
    // {
    //   id: 4,
    //   title: 'True or False',
    //   description: 'Decide if a statment is true or false',
    // },
  ];
  allForms: any;

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
  }

  // Toggle Dropdown
  toggleDropdown() {
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
}
