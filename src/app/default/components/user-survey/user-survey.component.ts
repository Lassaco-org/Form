import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';
import { ResponseService } from 'src/app/shared/services/response.service';

@Component({
  selector: 'app-user-survey',
  templateUrl: './user-survey.component.html',
  styleUrls: ['./user-survey.component.scss'],
})
export class UserSurveyComponent implements OnInit {
  survey: any;
  currentSectionNumber: number = 1;
  dataLoading: boolean = true;
  currentShortCode: any;
  responses: any;
  isAlert: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  questionSectionLength: any;
  responseForm: any = FormGroup;
  loading: boolean = false;

  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private responseService: ResponseService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentShortCode = this.activatedRoute.snapshot.params;

    // Get Survey
    this.formService
      .getFormByShortCode(this.currentShortCode.shortCode)
      .subscribe({
        next: (res: any) => {
          this.survey = res.data;
          let surveyQuestion = this.survey.questions;
          this.questionSectionLength = Object.keys(surveyQuestion).length;
          // Creating form group
          surveyQuestion[this.currentSectionNumber].forEach((element: any) => {
            this.addControl(element.questKey, element.type);
          });
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });

    // Response form
    this.responseForm = this.formBuilder.group({});

    // this.method('First');
  }

  previousSection() {
    this.currentSectionNumber--;
    this.scrollToTop();
  }

  nextSection(data: any) {
    this.currentSectionNumber++;
    this.scrollToTop();

    // Creating form group
    let surveyQuestion = this.survey.questions;
    surveyQuestion[this.currentSectionNumber].forEach((element: any) => {
      console.log(element.questKey);
      this.addControl(element.questKey, element.type);
    });
  }

  // Add control to formBuildr
  addControl(key: any, type: string) {
    if (type === 'checkbox') {
      this.responseForm.addControl(key, this.formBuilder.control([]));
    } else {
      this.responseForm.addControl(key, this.formBuilder.control(''));
    }

    console.log(this.responseForm.value);
  }

  onCheckChange(event: any) {
    const formArray: FormArray = this.responseForm.get('24Ftxi') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }

    console.log(this.responseForm.value);
  }

  getMultipleValues(event: any) {
    // console.log(event.target.value);
    let me = this.responseForm.get('24Ftxi').value;
    this.responseForm
      .get('24Ftxi')
      .setValue([...this.responseForm.get('24Ftxi').value, event.target.value]);
    // this.toppings.setValue([...this.toppings.value,"Onion"]);

    console.log(this.responseForm.get('24Ftxi').value);
    console.log(this.responseForm.value);
  }

  // Submit response
  async submitResponse() {
    // Start loading
    this.loading = true;

    console.log(this.responseForm.value);
    // if (type === 'checkbox') {
    //   let payload = {
    //     [questKey]: [data],
    //   };
    // this.answers.push(payload);
    // } else {
    //   this.answers.push({ [questKey]: data });
    // }
    // console.log(this.answers);
    // this.answers.forEach((a: any) => {
    //   let keyExist = Object.keys(a).some((key) => key === questKey);
    //   console.log(keyExist);
    // });

    // if (this.answers.hasOwnProperty('name')) {
    //   console.log('Yes');
    //   // console.log(this.answers);
    // } else {
    //   console.log('No');
    // }

    // this.router.navigate([
    //   `/surveys/${this.currentShortCode.shortCode}/submitted`,
    // ]);

    var formData: any = new FormData();
    for (let i in this.responseForm.value) {
      formData.append(i, this.responseForm.value[i]);
    }

    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const result = await this.responseService.addPage(
        formData,
        this.currentShortCode.shortCode
      );
      this.showAlert(result.message, 'success');
      // Route user
      setTimeout(() => {
        // Route user
        this.router.navigate([
          `/surveys/${this.currentShortCode.shortCode}/submitted`,
        ]);
      }, 3000);
    } catch (error: any) {
      this.loading = false;

      console.error(error.message);
      // Show error message
      this.showAlert(error.message, 'error');
    }

    // this.responseService
    //   .addResponse(formData, this.currentShortCode.shortCode)
    //   .pipe(first())
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       if (res.message === 'Form submitted successfully') {
    //         this.showAlert('Done!', 'success');
    //         // Route user
    //         setTimeout(() => {
    //           // Route user
    //           this.router.navigate([
    //             `/surveys/${this.currentShortCode.shortCode}/submitted`,
    //           ]);
    //         }, 3000);
    //       }
    //     },
    //     error: (e) => {
    //       console.error(e.message);
    //       // Show error message
    //       this.showAlert(e.message, 'error');
    //     },
    //   });
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

  // Scroll Up
  scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
