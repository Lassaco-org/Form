import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss'],
})
export class AddSurveyQuestionComponent implements OnInit {
  isDropDown: boolean = false;
  selectedDropdownValue: string = 'Short Answer';
  questionTypes = [
    {
      id: 1,
      title: 'Single Selection',
      description: 'Choose the single option',
    },
    {
      id: 2,
      title: 'Multiple Selection',
      description: 'Choose multiple options',
    },
    {
      id: 3,
      title: 'Short Answer',
      description: 'Type your response',
    },
    {
      id: 4,
      title: 'True or False',
      description: 'Decide if a statment is true or false',
    },
  ];

  ngOnInit() {}

  // Toggle Dropdown
  toggleDropdown() {
    this.isDropDown = !this.isDropDown;
  }

  // On Select
  selectItem(val: any) {
    // Set selected value
    this.selectedDropdownValue = val.title;

    // Close Dropdown on Select
    this.isDropDown = false;
  }
}
