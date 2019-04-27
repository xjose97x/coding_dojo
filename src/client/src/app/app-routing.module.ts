import { Routes } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: []
  },
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  }
];
