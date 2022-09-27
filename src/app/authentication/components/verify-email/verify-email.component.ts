import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;
  hide: boolean = true;
  alertColor: string = '';
  isTokenExpired: boolean = false;
  currentUserEmail: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get Current Rating Agency ID
    this.currentUserEmail = this.activatedRoute.snapshot.params;
    console.log(this.currentUserEmail);

    // User form
    this.userForm = this.formBuilder.group({
      token: ['', [Validators.required]],
    });
  }

  // Verify email
  verifyEmail() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    this.authService
      .verifyEmail(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.showAlert(res.message, 'success');

          setTimeout(() => {
            // Route user
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: (e) => {
          console.error(e);

          // Show error message
          this.showAlert(e.message, 'error');

          // Set loading to false
          this.loading = false;

          // If not verified
          if (e.message === 'This token is invalid or has expired') {
            this.isTokenExpired = true;
          }
        },
      });
  }

  // Get Verification code
  sendEmailVerificationCode() {
    this.authService
      .requestEmailVerification(this.currentUserEmail.email)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          this.showAlert(
            `Verification code sent to ${this.currentUserEmail.email}`,
            'success'
          );

          this.isTokenExpired = false;
        },
        error: (e) => {
          console.error(e.message);

          // Show error message
          this.showAlert(e.message, 'error');
        },
      });
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
