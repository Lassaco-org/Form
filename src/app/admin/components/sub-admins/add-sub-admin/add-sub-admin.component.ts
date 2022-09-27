import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-add-sub-admin',
  templateUrl: './add-sub-admin.component.html',
  styleUrls: ['./add-sub-admin.component.scss'],
})
export class AddSubAdminComponent implements OnInit {
  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  hide: boolean = true;
  alertColor: string = '';
  isFormSubmitted: boolean = false;
  user: any;

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Get user details
    let userData = this.authService.getUserFromLocalStorage();
    this.user = userData.user;
    // Prevent Non-Super admin from routing here
    if (this.user.type !== 'super') {
      this.router.navigate(['admin']);
    }
  }

  addAndCloseAdmin() {
    this.validateForm();

    this.adminService
      .createAdmin(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Admin added successfully') {
            this.showAlert(res.message, 'success');

            // Stop loading
            this.loading = false;

            // Route to display
            setTimeout(() => {
              this.router.navigate(['admin/display-admins']);
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

  addAndNewAdmin() {
    this.validateForm();

    this.adminService
      .createAdmin(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'Admin added successfully') {
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
