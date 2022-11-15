import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
})
export class DashboardSidenavComponent implements OnInit {
  @Input() navLinks: any;
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get user details
    let userData = this.authService.getUserFromLocalStorage();
    this.user = userData.user;
  }

  // Close menu
  closeMenu() {
    this.hamClick.emit();
  }

  // Log out
  logOut() {
    this.authService.logOut();
  }
}
