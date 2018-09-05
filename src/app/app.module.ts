import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileService } from './com-profile/profile.service';
import { DeleteBlogService } from './Blogchoicegenie/adminblog/delete-blog.service';
import { EditBlogService } from './Blogchoicegenie/adminblog/edit-blog.service';
import { AngularcliStarRatingModule } from 'angularcli-star-rating'
import { LoaderModule } from './loader/loader.module';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { SuperadminComponent } from './layouts/superadmin/superadmin.component';
import { SupersiderbarComponent } from './supersiderbar/supersiderbar.component';
import { AppComponent } from './app.component';
import { SimpleGlobal } from 'ng2-simple-global';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { CustomerLayoutComponent } from './layouts/customer/customer-layout.component';
import { NormalLayoutComponent } from './layouts/normal/normal-layout.component';
import { AppRoutes } from './app.routing';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { AboutComponent } from './about/about.component';
import { HomeService } from './home/home.service';
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { DataService } from './data.service';
import { Authgaurd2Service } from './_guards/authgaurd2.service';
import { Authgaurd3Service } from './_guards/authgaurd3.service';

import { LoginService } from './pages/login/login.service';
import { ResidentialService } from './residential/residential-dialog2/residential.service';
import { PagerService } from './pager.service';
import { CompanyService } from './company.service';
import { StepperOverviewExample } from './signup/stepper-overview-example';
import { UserLoginService } from './pages/userlogin/userlogin.service';
import { SuperLoginService } from './pages/superlogin/superlogin.service';
import { DeleteService } from './regulated/dashboard/delete.service';
import { EditService } from './regulated/dashboard/edit.service';
import { RandomService } from './random.service';
import { ActiveService } from './active.service';
import { EditreviewService } from './ChoiceSuperAdmin/superreviews/editreview.service';
import { DeletereviewService } from './ChoiceSuperAdmin/superreviews/deletereview.service';
import { ChangepasswordService } from './changepassword.service';
import { DeletecontactService } from './ChoiceSuperAdmin/superviewcontact/deletecontact.service';
import { DeleteviewapartnerService } from './ChoiceSuperAdmin/sviewapartner/deleteviewapartner.service';
import { SuperupdateService } from './ChoiceSuperAdmin/superdashboard/superupdate.service';
import { DeletesuperdashboardService } from './ChoiceSuperAdmin/superdashboard/deletesuperdashboard.service';
import { DataloginService } from './pages/login/datalogin.service';
import { AuthguardService } from './_guards/authguard.service';
import { ConsumersidebarComponent } from './consumersidebar/consumersidebar.component';
import { ConsumeradminComponent } from './layouts/consumeradmin/consumeradmin.component';
import { UserNavbarModule } from './shared/usernavbar/usernavbar.module';
import { UpdateService } from './user-profile/update.service';
import { UpdatepartnerService } from './ChoiceSuperAdmin/sviewapartner/updatepartner.service';
import { HeaderService } from './header/header.service';
import { UnsubscribeService } from './unsubscribe/unsubscribe.service';
import { DeletegetuserService } from './ChoiceSuperAdmin/supergetusers/deletegetuser.service';
import { UpdategetuserService } from './ChoiceSuperAdmin/supergetusers/updategetuser.service';
// import { CookieService } from 'ngx-cookie-service';
import { BlogssComponent } from './blogss/blogss.component';

import { ExcelService } from './excel.service';



@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    MatFormFieldModule
  ],
  declarations: [],

})
export class MaterialModule { }

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'PlugExp' }),
    BrowserTransferStateModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularcliStarRatingModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    HttpClientModule,
    MaterialModule,
    MatSelectModule,
    MatNativeDateModule,
    SidebarModule,
    NavbarModule,
    UserNavbarModule,
    FooterModule,
    // Ng2CarouselamosModule,
    FooterModule,
    // CarouselModule.forRoot(),
    BrowserModule,
    LoaderModule,
    //IonicModule.forRoot(AppRoutes),
    //  HttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    CustomerLayoutComponent,
    NormalLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    SuperadminComponent,
    // HomeComponent,
    HeaderComponent,
    UserSidebarComponent,
    SupersiderbarComponent,
    AboutComponent,
    ConsumersidebarComponent,
    ConsumeradminComponent,
    // ChangePasswordComponent,
    StepperOverviewExample,
    // UsersdashboardComponent





  ],
  providers: [
    // CookieService
    ExcelService,
    HomeService,
    HeaderService,
    CompanyService,
    UnsubscribeService,
    SimpleGlobal,
    DataService,
    LoginService,
    PagerService,
    UserLoginService,
    SuperLoginService,
    ResidentialService,
    DeleteBlogService,
    EditService,
    Authgaurd2Service,
    DeleteService,
    ProfileService,
    DeletereviewService,
    EditreviewService,
    ActiveService,
    ChangepasswordService,
    DeletecontactService,
    DeleteviewapartnerService,
    SuperupdateService,
    DeletesuperdashboardService,
    DataloginService,
    AuthguardService,
    Authgaurd3Service,
    UpdateService,
    EditBlogService,
    UpdatepartnerService,
    RandomService,
    DeletegetuserService,
    UpdategetuserService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
