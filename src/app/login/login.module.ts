import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AuthService } from '../services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    LoginPage,
    ResetPasswordComponent,
    SignUpComponent
  ],
  providers: [AuthService]
})
export class LoginPageModule {}
