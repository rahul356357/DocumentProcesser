import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {AuthenticationService } from './authentication.service';
import {AuthGuard} from './authguard.service';
import { routing } from './app.routing';
import { FileViewComponent} from './file-view/file-view.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import {FilesystemService} from './fileupload/filesystem.service';
import { ModalModule } from 'ng2-bootstrap';
import { Fileupload2Component } from './fileupload2/fileupload2.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
   FileDropDirective,
   FileSelectDirective,
  FileuploadComponent, FileViewComponent, Fileupload2Component, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   routing,     ModalModule.forRoot() ],
  providers: [ AuthenticationService, AuthGuard, FilesystemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
