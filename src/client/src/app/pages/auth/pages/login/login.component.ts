import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToggleLoading, Login } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  loginForm = this.fb.group({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: ['', Validators.required]
  });

   // convenience getter for easy access to form fields
   get f(): any { return this.loginForm.controls; }


   onSubmit() {
    const val = this.loginForm.value;
    this.store.dispatch(new ToggleLoading());
    this.store.dispatch(new Login(val.email, val.password)).subscribe(
      _success => {
        this.store.dispatch(new ToggleLoading());
        this.router.navigateByUrl('/');
      },
      (error: string) => {
        this.store.dispatch(new ToggleLoading());
        this.toastr.error(error, 'Login');
      }
    );
  }

}
