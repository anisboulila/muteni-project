import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { GlobalCertificateComponent } from './global-certificate/global-certificate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Step2Component } from './step2/step2.component';
import { RecapComponent } from './recap/recap.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomepageComponent } from './homepage/homepage.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routesCertif: Routes = [
];

@NgModule({
  declarations: [
    GlobalCertificateComponent,
    Step1Component,
    Step2Component,
    RecapComponent,
    Step3Component,
    Step4Component,
    HomepageComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesCertif),
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class HonorCertificateModule { }
