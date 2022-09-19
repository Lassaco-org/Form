import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  hide: boolean = true;
  alertColor: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  // Forgot Password
  forgotPassword() {
    // Start loading
    this.loading = true;

    this.authService
      .requestPasswordReset(this.userForm.value.email)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.showAlert(res.message, 'success');

          setTimeout(() => {
            // Route user
            this.router.navigate(['/auth/reset-password']);
          }, 2000);
        },
        error: (e) => {
          console.error(e);

          // Show error message
          this.showAlert(e.message, 'error');

          // Set loading to false
          this.loading = false;
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
