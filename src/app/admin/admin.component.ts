import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  hamClick: any;
  isMenuOpen: boolean;

  navLinks: any;

  constructor() {}

  ngOnInit(): void {}

  // Toggle Menu
  toggleMenu() {
    this.hamClick = !this.hamClick;
    this.isMenuOpen = this.hamClick;
  }
}
