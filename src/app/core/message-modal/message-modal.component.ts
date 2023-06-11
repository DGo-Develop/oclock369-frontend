import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
})
export class MessageModalComponent implements AfterViewInit {
  @ViewChild('customModal') customModal: ElementRef | undefined;
  @Input() modalTitle: string | undefined;
  @Input() modalMessage: string | undefined;
  @Input() modalType: 'success' | 'warning' | 'danger' = 'success';

  modalInstance: Modal | undefined;

  ngAfterViewInit() {
    this.modalInstance = new Modal(this.customModal?.nativeElement);
  }

  openModal() {
    this.modalInstance?.show();
  }

  closeModal() {
    this.modalInstance?.hide();
  }
}
