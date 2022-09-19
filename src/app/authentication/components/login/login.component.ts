import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    // Start loading
    this.loading = true;

    let payload = {
      username: 'admin@formapp.com',
      password: 'Admin@1234',
    };
    console.log(this.userForm.value);

    this.authService
      .loginUser(this.userForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // If status is true
          if (res.message === 'User logged in successfully') {
            this.showAlert(res.message, 'success');
            // Set token
            this.authService.setToken(res.data?.token);

            // Set User data
            this.authService.addUserDataToLocalStorage(res.data);

            // Route user
            setTimeout(() => {
              // Route user
              this.router.navigate(['/admin']);
            }, 2000);
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

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
