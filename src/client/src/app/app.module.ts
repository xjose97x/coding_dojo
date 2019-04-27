import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthRoutingComponent } from './pages/auth-routing/auth-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthRoutingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
