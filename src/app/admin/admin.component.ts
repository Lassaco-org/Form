import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get user details
    let userData = this.authService.getUserFromLocalStorage();
    this.user = userData.user;
  }
}
