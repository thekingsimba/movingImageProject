import { Component, Input } from '@angular/core';

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
}
