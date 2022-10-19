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

  selectedFile: File;
  // previewImage: any;
  // showPreviewImage: boolean = false;
  emailList: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

  // Add email
  addEmail() {
    this.emailList.push(this.userForm.value.email);

    this.userForm.get('email').setValue('');
  }

  // Remove Email
  removeEmail(index: any) {
    this.emailList.splice(index, 1);
  }

  // Upload File
  uploadFile(event: any) {
    // Preview File Selected
    this.selectedFile = event[0].name;

    // if (this.selectedFile) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.selectedFile);
    //   reader.onload = (e: any) => {
    //     this.previewImage = e.target.result;
    //     console.log(e);

    //     if (this.previewImage !== '') {
    //       this.showPreviewImage = true;
    //     } else {
    //       this.showPreviewImage = false;
    //     }
    //   };
    // }

    this.showAlert('File uploaded!', 'success');
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
