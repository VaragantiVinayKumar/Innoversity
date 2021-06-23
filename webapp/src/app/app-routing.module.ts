import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailedChallengeDesComponent } from './components/detailed-challenge-des/detailed-challenge-des.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SolutionAnalysisComponent } from './components/solution-analysis/solution-analysis.component';
import { UpdatesolutionComponent } from './components/updatesolution/updatesolution.component';
import { UploadchallengeComponent } from './components/uploadchallenge/uploadchallenge.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { LandingComponent } from './landing/landing.component';
import { SolutionComponent } from './solution/solution.component';


const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'landing',component:LandingComponent},
  {path:'solution/:challengeId',component:SolutionComponent},
  {path:'challenge',component:UploadchallengeComponent},
  {path:'solutionAnalysis/:challengeId',component:SolutionAnalysisComponent},
  {path:'feedback/:solutionId',component:FeedbackComponent},
  {path:'userProfile',component:UserprofileComponent},
  {path:'update/:solutionId',component:UpdatesolutionComponent},
  {path:'challengeDes/:challengeId',component:DetailedChallengeDesComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
