import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { UploadchallengeComponent } from './components/uploadchallenge/uploadchallenge.component';
import { SolutionComponent } from './solution/solution.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AngularEditorModule } from "@kolkov/angular-editor";
import { SolutionAnalysisComponent } from './components/solution-analysis/solution-analysis.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MatChipsModule } from "@angular/material/chips";
import { SpeechDialogComponent } from './speech-dialog/speech-dialog.component';
import { UserprofileComponent} from './components/userprofile/userprofile.component';
import { UpdatesolutionComponent} from './components/updatesolution/updatesolution.component';
import { DetailedChallengeDesComponent } from './components/detailed-challenge-des/detailed-challenge-des.component'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    RegistrationComponent,
    SolutionComponent,
    UploadchallengeComponent,
    LoginComponent,
    DashboardComponent,
    FeedbackComponent,
    SolutionAnalysisComponent,
    SpeechDialogComponent,
    UserprofileComponent,
    UpdatesolutionComponent,
    DetailedChallengeDesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularEditorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatInputModule,
    MatChipsModule,
    CommonModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [DashboardComponent, FeedbackComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
