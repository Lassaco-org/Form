import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-share-survey',
  templateUrl: './share-survey.component.html',
  styleUrls: ['./share-survey.component.scss'],
})
export class ShareSurveyComponent implements OnInit {
  @Output() isShareModal: EventEmitter<any> = new EventEmitter();
  @Input() formId: string = '';

  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  alertColor: string = '';
  isFormSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  closeShareModal() {
    this.isShareModal.emit();
  }
}
