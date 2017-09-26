import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	username: String;
	password: String;


  constructor(
  	private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
  	const user = {
  		username: this.username,
  		password: this.password
  	}
  	//console.log(this.username);

  	// Required Fields
  	if(!this.validateService.validateLogin(user)){
  		this.flashMessage.show('Please fill in all fields', {cssClass:'alert-danger', timeout:3000});
  		return false;
  	}


  	this.authService.authenticateUser(user).subscribe(data => {
  		console.log(data);
		if (data.success){
			this.authService.storeUserData(data.token, data.user);
			this.flashMessage.show('You are now loged in', {cssClass:'alert-success', timeout:3000});
			this.router.navigate(['/dashboard']);
		} else {
			this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout:3000});
			this.router.navigate(['/login']);
		}
    });
  }

}
