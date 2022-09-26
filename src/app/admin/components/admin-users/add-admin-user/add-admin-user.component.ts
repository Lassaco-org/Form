import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss'],
})
export class AddAdminUserComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  hide: boolean = true;
  alertColor: string = '';
  isFormSubmitted: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

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

  addAndCloseUser() {
    this.validateForm();

    this.authService
      .createUser(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Account created successfully.') {
            this.showAlert(res.message, 'success');

            // Stop loading
            this.loading = false;

            // Route to display
            this.router.navigate(['admin/users']);
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

  addAndNewUser() {
    this.validateForm();

    this.authService
      .createUser(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Account created successfully.') {
            this.showAlert(res.message, 'success');

            // Stop loading
            this.loading = false;

            // Reset form
            this.userForm.reset();
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
