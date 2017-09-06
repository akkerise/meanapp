import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, Routes} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {ValidateService} from "../../services/validate.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private username: string;
    private password: string;


    constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService, private validateService: ValidateService) {
    }

    ngOnInit() {

    }

    onLoginSubmit = () => {

        let user: any = {
            username: this.username,
            password: this.password
        }

        if (this.validateService.validateLogin(user) === false) {
            this.flashMessage.show('Please fill all fields', {timeout: 3000, cssClass: 'alert-warning'})
        }

        this.authService.authenticateUser(user).subscribe(res => {
            if (res.success) {
                this.authService.storeUserDataLocalStorage(res.token, res.user);
                this.flashMessage.show("You are now logged in", {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/dashboard'])
            } else {
                this.flashMessage.show(res.message, {timeout: 3000, cssClass: 'alert-danger'});
                this.router.navigate(['/register'])
            }
        })

    };

    private enterForm = (keyCode: number) => {
        if (keyCode === 13) {
            this.onLoginSubmit();
        }
    }

    ngOnChanges() {

    }

}
