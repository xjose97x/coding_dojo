import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout, ToggleLoading, AppState } from 'src/app/core/state/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  @Select(AppState.token) token$: Observable<string>;

  constructor(private store: Store, private router: Router) { }

  signOut() {
    this.store.dispatch(new Logout()).subscribe(() => {
      this.router.navigateByUrl('/auth/login');
      this.store.dispatch(new ToggleLoading(false));
    });
  }

}
