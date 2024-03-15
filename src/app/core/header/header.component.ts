import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { CookieManagerService } from '../../cookie-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
 hasUser:boolean | undefined;
 private subscription: Subscription | undefined;
  
  constructor(private userService:UserService, private cookieManager: CookieManagerService){
  }


  logout():void{
    this.userService.logout();
    this.cookieManager.removeCookiesState();
    
  }
  ngOnInit(): void {
    this.subscription = this.cookieManager.isLoggedIn$.subscribe(boolean=>{ this.hasUser = boolean})
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
  

}
