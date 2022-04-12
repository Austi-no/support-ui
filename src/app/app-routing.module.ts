import { BranchComponent } from './components/branch/branch.component';
import { ManageClientUserComponent } from './components/security/manage-client-user/manage-client-user.component';
import { SuperadminGuard } from './components/security/helpers/superadmin.guard';
import { ClientAdminGuard } from './components/security/helpers/client-admin.guard';
import { ManageUsersComponent } from './components/security/manage-users/manage-users.component';
import { UsertypeComponent } from './components/security/usertype/usertype.component';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { CallTypeComponent } from './components/call-type/call-type.component';
import { RegisterComponent } from './components/security/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ClientMessagesComponent } from './components/admin/client-messages/client-messages.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { LoginComponent } from './components/security/login/login.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { AdminAreaComponent } from './layout/admin/admin-area/admin-area.component';
import { ClientAreaComponent } from './layout/client/client-area/client-area.component';
import { AuthGuard } from './components/security/helpers/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'support', component: ClientAreaComponent,
    children: [
      { path: '', component: ListTicketsComponent, canActivate: [AuthGuard] },
      { path: 'new-ticket', component: NewTicketComponent, canActivate: [AuthGuard] },
      { path: 'conversations', component: ConversationsComponent, canActivate: [AuthGuard] },
      { path: 'call-type', component: CallTypeComponent, canActivate: [SuperadminGuard] },
      { path: 'organisation', component: OrganisationComponent, canActivate: [SuperadminGuard] },
      { path: 'branch', component: BranchComponent, canActivate: [ClientAdminGuard] },
      { path: 'manage-users', component: ManageUsersComponent, canActivate: [SuperadminGuard] },
      { path: 'manage-client-users', component: ManageClientUserComponent, canActivate: [ClientAdminGuard] },
      { path: 'user-type', component: UsertypeComponent, canActivate: [SuperadminGuard] },
      { path: 'conversation/:id', component: ConversationsComponent, canActivate: [AuthGuard] },

    ]
  },

  {
    path: 'admin', component: AdminAreaComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'client-messages', component: ClientMessagesComponent },

    ]
  }





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
