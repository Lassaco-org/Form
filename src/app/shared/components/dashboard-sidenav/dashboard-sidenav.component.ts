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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  closeMenu() {
    this.hamClick.emit();
  }

  // Log out
  logOut() {
    this.authService.logOut();
  }
}
