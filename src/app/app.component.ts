import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from './core/auth/auth.service';
import { SpinnerService } from './core/services/spinner.service';
import { MessageModalComponent } from './core/message-modal/message-modal.component';
import { MessageModalService } from './core/message-modal/message-modal.service';

interface ModalData {
  title: string;
  message: string;
  type: 'success' | 'warning' | 'danger';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('messageModal')
  messageModal!: MessageModalComponent;
  modalTitle: string | undefined;
  modalMessage: string | undefined;
  modalType: 'success' | 'warning' | 'danger' = 'success';

  constructor(
    public authService: AuthService,
    public spinnerService: SpinnerService,
    private messageModalService: MessageModalService
  ) {}

  ngAfterViewInit() {
    this.messageModalService.showError.subscribe(
      ({ title, message, type }: ModalData) => {
        this.modalTitle = title;
        this.modalMessage = message;
        this.modalType = type;
        this.messageModal.openModal();
      }
    );
  }
}
