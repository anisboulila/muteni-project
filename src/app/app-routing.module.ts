import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalCertificateComponent } from './honor-certificate/global-certificate/global-certificate.component';
import { HomepageComponent } from './honor-certificate/homepage/homepage.component';
import { ConfirmationComponent } from './honor-certificate/confirmation/confirmation.component';

const routes: Routes = [
  {path : "certificate", component: GlobalCertificateComponent},
  {path : "profile", component: HomepageComponent},
  { path: 'confirmation', component: ConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
