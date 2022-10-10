import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Dashboard 
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
// Core
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctor/doctor.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progess' } },
  { path: 'graph1', component: Graph1Component, data: { title: 'Graphs' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
  { path: 'user-profile', component: ProfileComponent, data: { title: 'User profile' } },
  { path: 'users', component: UsersComponent, data: { title: 'Users' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Doctor' } }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
