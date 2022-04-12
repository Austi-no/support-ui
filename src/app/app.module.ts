import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './components/security/register/register.component';
import { CustomValidationService } from './components/security/validator/custom-validators';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { LoginComponent } from './components/security/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ClientMessagesComponent } from './components/admin/client-messages/client-messages.component';
import { ClientAreaComponent } from './layout/client/client-area/client-area.component';
import { HeaderComponent } from './layout/client/header/header.component';
import { FooterComponent } from './layout/client/footer/footer.component';
import { AdminAreaComponent } from './layout/admin/admin-area/admin-area.component';
import { AdminHeaderComponent } from './layout/admin/admin-header/admin-header.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { CallTypeComponent } from './components/call-type/call-type.component';
import { AuthInterceptor } from './components/security/helpers/auth.interceptor';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { UsertypeComponent } from './components/security/usertype/usertype.component';
import { ManageUsersComponent } from './components/security/manage-users/manage-users.component';
import { ManageClientUserComponent } from './components/security/manage-client-user/manage-client-user.component';
import { BranchComponent } from './components/branch/branch.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientAreaComponent,
    HeaderComponent,
    FooterComponent,
    NewTicketComponent,
    ListTicketsComponent,
    ConversationsComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    ClientMessagesComponent,
    AdminAreaComponent,
    AdminHeaderComponent,
    CallTypeComponent,
    OrganisationComponent,
    UsertypeComponent,
    ManageUsersComponent,
    ManageClientUserComponent,
    BranchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),

  ],
  providers: [CustomValidationService, ToastService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
