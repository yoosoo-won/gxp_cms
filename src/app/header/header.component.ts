import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private router: Router) { }

    logout() {
        if(this.getCookie('userInfo')) {
            this.deleteCookie('userInfo');
            this.router.navigate(['/', 'login']);
        }
    }

    setCookie(name:string, value:string, exp:number, isEncoding:boolean = false) {
        const date = new Date();
        date.setTime(date.getTime() + exp*1000*60*60*24);

        document.cookie = name + "=" + (isEncoding ? btoa(value) : value) + "; expires=" + date.toUTCString() + "; path=/";
    }
    getCookie(name:string, isDecoding:boolean = false) {
        const data = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        const value = data? data[2] : null;

        return isDecoding ? atob(value) : value;
    }
    deleteCookie(name:string) {
        this.setCookie(name, '', -1);
    }
}

