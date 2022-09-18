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
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    let payload = {
      username: 'admin@formapp.com',
      password: 'Admin@1234',
    };
    console.log(payload);

    this.authService
      .loginUser(payload)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          console.log(`Server Response Result: ${res.responseMessage}`);
          // this.toastr.success(res.responseMessage);

          // Route
          // this.router.navigate([
          //   'dashboard',
          // ]);
        },
        error: (e) => {
          console.error(e);
          // this.toastr.error(e);
        },
      });
  }
}
