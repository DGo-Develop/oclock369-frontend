import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { UserService } from '../user.services';
import { MessageModalService } from 'src/app/core/message-modal/message-modal.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
  });

  isError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private logger: LoggerService,
    private userService: UserService,
    private messageModalService: MessageModalService
  ) {}

  onSubmit() {
    if (this.resetForm.valid) {
      this.userService
        .requestResetPassword(this.resetForm.controls.username.value ?? '')
        .subscribe((response) => {
          this.messageModalService.showError.next({
            title: 'Track 369',
            message: `${response.data.message}`,
            type: 'success',
          });
        });
    }
  }
}
