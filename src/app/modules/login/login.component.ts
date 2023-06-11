import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Constants } from 'src/app/constants/messages';
import { LoggerService } from '../../core/logger/logger.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  isErrorLogin: Boolean = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required, Validators.minLength(9)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authService: AuthService,
    private logger: LoggerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');
      const username = usernameControl?.value ?? '';
      const password = passwordControl?.value ?? '';

      this.login(username, password);
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        const decodedToken: any = jwt_decode(response.data.accessToken);
        localStorage.setItem('role', decodedToken.role.name);

        this.authService.isLoggedIn.next(true);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.isErrorLogin = true;
        let errorMessage = '';

        if (Array.isArray(error.error.error)) {
          errorMessage = 'Error en el formulario: ';
          error.error.error.forEach(
            (errorObj: { message: any }, index: number) => {
              errorMessage += ` ${errorObj.message}`;
              if (index !== error.error.error.length - 1) {
                errorMessage += ', ';
              }
            }
          );
        }

        if (
          error.error.error.message !== undefined &&
          error.error.error.message
        ) {
          errorMessage =
            error.error.error.message ??
            Constants.AUTHENTICATION_ERROR_NOT_CONTROLED;
        }

        this.errorMessage = `${errorMessage ?? ''}`;
        this.logger.logError(this.errorMessage, error.stack);
      }
    );
  }

  redirectToResetPassword() {
    this.router.navigate(['/user/reset-password']);
  }
}
