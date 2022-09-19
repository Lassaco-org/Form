import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent implements OnInit {
  @Input() text: string = '';
  @Input() color: string = '';

  constructor() {}

  ngOnInit(): void {}
}
