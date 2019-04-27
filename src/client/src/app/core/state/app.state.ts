import { Action, Selector, State, StateContext } from '@ngxs/store';
import { flatMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export interface IAppStateModel {
  loading: boolean;
  token: string;
}

export class ToggleLoading {
  static readonly type = '[App] Toggle Loading';
  constructor(public status: boolean = null) { }
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public email: string, public password: string) { }
}

export class SignUp {
  static readonly type = '[Auth] Signup';
  constructor(public email: string, public password: string) { }
}

@State<IAppStateModel>({
  name: 'app'
})
export class AppState {

  @Selector() static token(state: IAppStateModel) { return state.token; }

  constructor(private authService: AuthService) { }

  @Action(ToggleLoading)
  toggleLoading({ patchState, getState }: StateContext<AppStateModel>, payload: ToggleLoading) {
      if (payload.status !== null) {
          return patchState({ loading: payload.status });
      }
      let loading = false;
      if (getState() != null) {
          loading = getState().loading;
      }
      patchState({ loading: !loading });
  }

  @Action(Login)
  login({ setState }: StateContext<IAppStateModel>, payload: Login) {
    return this.authService.login(payload.email, payload.password)
      .pipe(
        tap(token => setState({ token: token })
        ));
  }

  @Action(SignUp)
  signUp({ dispatch }: StateContext<IAppStateModel>, payload: SignUp) {
    return this.authService.signUp(payload.email, payload.password)
      .pipe(
        flatMap(() => dispatch(new Login(payload.email, payload.password)))
      );
  }
}
