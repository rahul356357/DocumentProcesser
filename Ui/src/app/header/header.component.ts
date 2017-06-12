import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import { Router, CanActivate } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit() {
  }
  logout(){
    console.log("logout called")
    this.router.navigate[('/login')]

  }
}
