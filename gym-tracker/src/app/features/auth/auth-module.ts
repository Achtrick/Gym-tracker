import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Login } from './login/login';
import { Register } from './register/register';
import { ResetPassword } from './reset-password/reset-password';

@NgModule({
  declarations: [],
  imports: [CommonModule, Login, Register, ForgotPassword, ResetPassword, AuthRoutingModule],
  exports: [AuthRoutingModule],
})
export class AuthModule {}
