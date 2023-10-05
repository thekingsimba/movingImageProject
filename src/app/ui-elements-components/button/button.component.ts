import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mi-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() color: string = '#FFF';
  @Input() border: string = '';
  @Input() backgroundColor: string = '';
  @Input() text: string = '';
  @Input() buttonClass: string = '';
  @Input() isDisabled: boolean = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  constructor() { }

  handleClick(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
