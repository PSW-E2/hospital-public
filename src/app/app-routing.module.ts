import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IntAuthGuard } from "./integration/guards/int-auth.guard";
import { IntUnuthGuard } from "./integration/guards/int-unauth.guard";
import { IntLoginComponent } from "./integration/components/login/int-login.component";
import { AuthComponent } from "./modules/pages/auth/auth.component";
import { HomeComponent } from "./modules/pages/home/home.component";
import { LoginComponent } from "./modules/pages/login/login.component";import { RegisterComponent } from "./modules/pages/register/register.component";
import { WelcomeComponent } from "./modules/pages/welcome/welcome.component";
import { PatientScheduleAppointmentComponent } from "./modules/pages/home/patient-schedule-appointment/patient-schedule-appointment.component";
import { AuthGuard } from "./modules/pages/login/log-auth.guard";
import { RecommendedAppointmentsComponent } from "./modules/pages/recommended-appointments/recommended-appointments.component";
import { Ads1Component } from "./modules/pages/ads1/ads1.component";

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth/:id', component: AuthComponent},
  { path: 'patient-schedule-appointment', component: PatientScheduleAppointmentComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recommended-appointments', component: RecommendedAppointmentsComponent },
  { path: 'patientAds', component: Ads1Component },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  
  {
    path: 'integration/login',
    component: IntLoginComponent,
    canActivate: [IntUnuthGuard]
  },
  {
    path: 'integration',
    loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule),
    canActivate: [IntAuthGuard]
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
