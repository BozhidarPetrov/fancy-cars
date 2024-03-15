import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagerService } from './cookie-manager.service';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';
import { RegisteredUser } from './types/registeredUser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 isLoggedIn:boolean = false;
 userInfo:RegisteredUser | undefined;
 id:any
 private subscription: Subscription | undefined;

  constructor(private cookieManager: CookieManagerService, private userService: UserService ){
    
  }  
  
  ngOnInit() {
    this.subscription = this.cookieManager.isLoggedIn$.subscribe(boolean=> {this.isLoggedIn = boolean});
    this.subscription = this.userService.user$.subscribe(user=> {this.userInfo = user, this.id = user?._id}
      )
  }
  
ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}


}
