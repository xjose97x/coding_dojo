import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthComponent, SignupComponent, LoginComponent]
})
export class AuthModule { }
