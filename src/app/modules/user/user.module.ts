import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [ResetPasswordComponent, UpdatePasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
