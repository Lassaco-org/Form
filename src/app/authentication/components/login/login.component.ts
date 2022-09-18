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
  errorMessage: string = '';
  showError: boolean = false;
  userForm: any = FormGroup;

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
      .loginUser(payload)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          // this.toastr.success(res.responseMessage);

          // If status is true, set User Type
          if (res.message === 'User logged in successfully') {
            // Set token
            this.authService.setToken(res.data?.token);

            // Set User data
            this.authService.addUserDataToLocalStorage(res.data);

            // Route user
            this.router.navigate(['/admin']);
          }
        },
        error: (e) => {
          console.error(e);

          // Show error message
          this.errorMessage = e.error.message;

          this.showError = true;

          // Set loading to false
          this.loading = false;
          // this.toastr.error(e);
        },
      });
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
