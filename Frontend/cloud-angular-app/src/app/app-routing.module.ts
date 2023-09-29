import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloudFormationTemplateComponent } from './cloudform-templates/cloudform-templates.component';
import { FinanceComponent } from './financial-page/finance-app';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: "app-cloudform-templates", component: CloudFormationTemplateComponent},
  { path: "finance-app", component: FinanceComponent},
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component : RegisterComponent},
  { path: 'account', component: AccountComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
