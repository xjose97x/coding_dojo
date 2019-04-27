import { Component, ChangeDetectorRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppState } from './core/state/app.state';
import { Observable, Subscription } from 'rxjs';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(AppState.loading) processLoading$: Observable<boolean>;
  routeLoading = false;

  routerSubscription: Subscription;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private toastService: ToastrService
    ) {
    this.routerSubscription = this.router.events
    .subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.routeLoading = true;
        } else if (event instanceof NavigationEnd
          || event instanceof NavigationCancel
          || event instanceof NavigationError) {
          this.routeLoading = false;
        }
        this.cd.detectChanges();
      },
      error => {
        this.toastService.error(error);
      }
    );
  }
}
