import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
})
export class DashboardSidenavComponent implements OnInit {
  @Input() navLinks: any;
  @Output() hamClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeMenu() {
    this.hamClick.emit();
  }
}
