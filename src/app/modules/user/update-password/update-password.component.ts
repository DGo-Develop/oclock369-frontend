import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from 'src/app/core/logger/logger.service';
import { UserService } from '../user.services';
import { MessageModalService } from 'src/app/core/message-modal/message-modal.service';
import { ActivatedRoute } from '@angular/router';
import { DecodedToken } from 'src/app/core/auth/auth.interfaces';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  token: string | null = null;

  updateForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private fb: FormBuilder,
    private logger: LoggerService,
    private userService: UserService,
    private messageModalService: MessageModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.userService.verifyResetToken(this.token ?? '').subscribe(() => {
        this.updatePassword();
      });
    }
  }

  updatePassword() {
    const decodedToken: DecodedToken = jwt_decode(this.token ?? '');

    const UserId = `${decodedToken.user.user_id}`;
    this.userService
      .updatePassword(UserId, this.updateForm.controls.password.value ?? '')
      .subscribe((response) => {
        this.messageModalService.showError.next({
          title: 'Track 369',
          message: `${response.data.message}`,
          type: 'success',
        });
      });
  }
}
