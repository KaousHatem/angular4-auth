import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { StatusComponent } from './components/status/status.component';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { LoginRedirectService } from './services/login-redirect.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'login', 
        component: LoginComponent,
        canActivate: [LoginRedirectService]
      },
      {
        path: 'register', 
        component: RegisterComponent,
        canActivate: [LoginRedirectService]
      },
      {
        path: 'status', 
        component: StatusComponent,
        canActivate: [EnsureAuthenticatedService]
      }
    ]),
    FormsModule
  ],
  providers: [
    AuthService,
    EnsureAuthenticatedService,
    LoginRedirectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
