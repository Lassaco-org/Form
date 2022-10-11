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
  copyText: any;
  tooltip: any;

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

  // Copy text to clipboard
  copyLink(link: any) {
    navigator.clipboard.writeText(link);

    this.showAlert('Survey link copied!', 'success');
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
}
