import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() productSelected: any;
  @Output() close = new EventEmitter<void>();
  @Output() item = new EventEmitter<any>();
  onClose() {
    this.close.emit();
  }

  add(productSelected: any) {
    this.item.emit(productSelected);
  }
}
