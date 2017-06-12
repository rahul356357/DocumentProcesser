import {SignupComponent} from './signup/signup.component';
import{ HomeComponent }from './home/home.component';
import {LoginComponent} from './login/login.component'
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {FileuploadComponent} from './fileupload/fileupload.component';
import {AuthGuard} from './authguard.service';
import {Fileupload2Component} from './fileupload2/fileupload2.component';
const appRoutes: Routes = [
    {path:'', component:LoginComponent},
    { path: 'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    { path:'home', component: HomeComponent ,   canActivate:[AuthGuard] },
    { path:'upload', component:  FileuploadComponent  , canActivate:[AuthGuard]},
     { path:'upload2', component:  Fileupload2Component  , canActivate:[AuthGuard]},
  // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);