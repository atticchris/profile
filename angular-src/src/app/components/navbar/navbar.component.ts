import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
  	private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
  	this.authService.logout();
  	this.flashMessage.show('You are logged out', {
  		cssClass:'alert-success',
  		timeout: 3000
  	});
  	this.router.navigate(['/login']);
  	return false;
  }

}
