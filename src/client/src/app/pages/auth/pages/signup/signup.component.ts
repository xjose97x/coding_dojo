import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidator } from 'src/app/shared/validators/password.validator';
import { ToggleLoading, SignUp } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  },
    {
      validator: [PasswordValidator.MatchPassword('password', 'passwordConfirm')]
    }
  );

  // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  onSubmit() {
    const val = this.registerForm.value;
    this.store.dispatch(new ToggleLoading());
    this.store.dispatch(new SignUp(val.email, val.password)).subscribe(
      () => {
        this.router.navigateByUrl('/');
        this.store.dispatch(new ToggleLoading());
      },
      (error: string) => {
        this.store.dispatch(new ToggleLoading());
        this.toastr.error(error, 'Sign Up');
      }
    );
  }
}
