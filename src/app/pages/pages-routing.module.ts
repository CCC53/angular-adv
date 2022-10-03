import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard], children: [
        { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'progress', component: ProgressComponent, data: { title: 'Progess' } },
        { path: 'graph1', component: Graph1Component, data: { title: 'Graphs' } },
        { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings' } },
        { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
        { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
        { path: 'user-profile', component: ProfileComponent, data: { title: 'User profile' } },
        { path: 'users', component: UsersComponent, data: { title: 'Users' } }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
