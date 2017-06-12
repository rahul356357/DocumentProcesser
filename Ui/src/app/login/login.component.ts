import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    message = 'Oops Something Went Wrong!!!!';
  constructor(private authenticationService :AuthenticationService , private router:Router) { }

  ngOnInit() {
    this.authenticationService.logout();
  }


   login() {
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(response => {
                if(!response.success){
                this.loading= !response.success;
                this.message= response.message;
                }
               if(response.success){
               this.router.navigate(['/upload']);      
               }
             });
     }


}
