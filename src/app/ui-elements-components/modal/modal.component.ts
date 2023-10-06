import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataFromDeleteSubject } from 'src/app/models/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'mi-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() text: string = '';

  @Output() onConfirm = new EventEmitter<MouseEvent>();
  @Output() onCancel = new EventEmitter<MouseEvent>();
  @Output() onClose = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {

  }

  confirm(event: MouseEvent) {
    this.onConfirm.emit(event);
  }

  cancel(event: MouseEvent) {
    this.onCancel.emit(event);
  }

  closeModal(event: MouseEvent) {
    this.onClose.emit(event);
  }

}
