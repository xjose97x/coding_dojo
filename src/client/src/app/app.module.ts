import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './core/state/app.state';
import { environment } from 'src/environments/environment';
import { ShellComponent } from './components/shell/shell.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({ closeButton: true, progressBar: true, positionClass: 'toast-bottom-right' }),
    CoreModule.forRoot(),
    NgxsModule.forRoot([
      AppState
    ], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: ['app.token'],
      deserialize: deserializeState
    }),
    !environment.production ? [NgxsReduxDevtoolsPluginModule.forRoot(), NgxsLoggerPluginModule.forRoot()] : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function deserializeState(obj: string) {
  try {
    return JSON.parse(obj);
  } catch (e) {
    return undefined;
  }
}
