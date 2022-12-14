import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import * as XLSX from 'xlsx';
import { FormService } from '../../services/form.service';

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
  arrayBuffer: any;
  file: File;
  emailList: any[] = [];
  showEmailList: boolean = false;
  selectedFileName: any;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: [''],
      message: [
        'Lasaco Assurance Plc shared you this survey link, kindly spare us few minutes of your time to fill the form. Thank you!',
        [Validators.required],
      ],
    });
  }

  // Close Share Modal
  closeShareModal() {
    this.isShareModal.emit();
  }

  // Copy text to clipboard
  copyLink(link: any) {
    navigator.clipboard.writeText(link);

    this.showAlert('Survey link copied!', 'success');
  }

  // Add email
  addEmail() {
    if (this.userForm.value.email !== '') {
      // Show added email(s)
      this.showEmailList = true;
      this.emailList.push(this.userForm.value.email);
    }
    // Clear input field
    this.userForm.get('email').setValue('');
  }

  // Remove Email
  removeEmail(index: any) {
    this.emailList.splice(index, 1);
  }

  uploadFile(event: any) {
    this.showEmailList = false;
    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;

    // Extract emails from xlxs sheet
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let emails = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      // Get each email address
      emails.forEach((email: any) => {
        if (email.__EMPTY.includes('.com')) {
          this.emailList.push(email.__EMPTY);
          this.showAlert('File uploaded!', 'success');
        } else {
          // Show alert
          // this.showAlert('No email found!', 'error');
        }
      });
    };
    fileReader.readAsArrayBuffer(this.file);

    // Show alert
  }

  // Share
  shareForm() {
    this.validateForm();
    let payload = {
      emails: this.emailList,
      subject: 'Survey form',
      message: `${this.userForm.value.message} Click on the link: https://lasaco-form.netlify.app/#/surveys/${this.formId}`,
      link: `https://lasaco-form.netlify.app/#/surveys/${this.formId}`,
    };

    this.formService
      .shareForm(payload)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Email sent successfully') {
            this.showAlert(res.message, 'success');

            setTimeout(() => {
              // Close modal
              this.closeShareModal();
            }, 3000);
          }
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

  // Validate form
  validateForm() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }
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
