import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  @Output() hamClick: EventEmitter<any> = new EventEmitter();
  @Input() isMenuOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  // Toggle Menu
  toggleMenu() {
    this.hamClick.emit();
  }
}
