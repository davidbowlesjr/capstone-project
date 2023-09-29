import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudFormationTemplateComponent } from './cloudform-templates/cloudform-templates.component';
import { FinanceAppModule } from './financial-page/finance-app.module';
import { UniversalHeaderComponent } from 'src/universal-header/universal-header.component';
import { CloudFormationTemplateModule } from './cloudform-templates/cloudform-templates.module';
import { AwsCatalogModule } from './aws-catalog/aws-catalog.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
import { AccountModule } from './account/account.module';



@NgModule({
  declarations: [
    AppComponent,
    UniversalHeaderComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent
  ],
  imports: [
    FinanceAppModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AwsCatalogModule,
    CloudFormationTemplateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
