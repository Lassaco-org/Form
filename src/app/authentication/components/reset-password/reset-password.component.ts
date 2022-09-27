import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;
  hide: boolean = true;
  alertColor: string = '';
  isTokenExpired: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      token: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  // Reset Password
  resetPassword() {
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
      .resetPassword(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.loading = false;

          this.showAlert(res.message, 'success');

          setTimeout(() => {
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
