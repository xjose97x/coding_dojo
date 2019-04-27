import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './core/state/app.state';
import { environment } from 'src/environments/environment';
import { ShellComponent } from './components/shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    NgxsModule.forRoot([
      AppState
    ], { developmentMode: !environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
