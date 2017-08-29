import {Component, OnInit} from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private name: string;
  private username: string;
  private email: string;
  private password: string;
  private data: any;


  constructor(private validateService: ValidateService, private _flashMessagesService: FlashMessagesService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }


  onRegisterSubmit = () => {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (this.validateService.validateRegister(user) === false) {
      console.log('Someone input is required');
      this._flashMessagesService.show('Please fill all fields', {timeout: 3000, cssClass: 'alert-danger'});
      return false
    }

    if (this.validateService.validateEmail(user.email) === false) {
      this._flashMessagesService.show('Please validate email', {timeout: 3000, cssClass: 'alert-danger'});
      console.log('Please validate email');
      return false;
    }


    this.authService.getUserByUsername(this.username).subscribe((res) => {
      if(res.data === null){
        this.authService.registerUser(user).subscribe((res) => {
          if (res.success) {
            this._flashMessagesService.show(res.message, {timeout: 3000, cssClass: 'alert-success'})
            // this.router.navigate(['/login'])
          } else {
            this._flashMessagesService.show(res.message, {timeout: 3000, cssClass: 'alert-danger'})
            // this.router.navigate(['/register'])
          }
        })
      }else{
        this._flashMessagesService.show('Username is exists !', {timeout: 3000, cssClass: 'alert-danger'})
      }
    })

    // Register User
    // if (this.data === null) {
    //
    // }else{
    //   if(this.data.username === user.username || this.data.email === user.email){
    //     this._flashMessagesService.show('Username or Email exists !', {timeout: 3000, cssClass: 'alert-warning'})
    //   }else{
    //     this.authService.registerUser(user).subscribe((res) => {
    //       if (res.success) {
    //         this._flashMessagesService.show(res.message, {timeout: 3000, cssClass: 'alert-success'})
    //         // this.router.navigate(['/login'])
    //       } else {
    //         this._flashMessagesService.show(res.message, {timeout: 3000, cssClass: 'alert-danger'})
    //         // this.router.navigate(['/register'])
    //       }
    //     })
    //   }
    // }
  }

}
