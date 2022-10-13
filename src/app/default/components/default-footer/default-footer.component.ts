import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent implements OnInit {
  currentYear: any;

  constructor() {}

  ngOnInit(): void {
    // Update the element to the current year //
    this.currentYear = new Date().getFullYear();
  }
}
