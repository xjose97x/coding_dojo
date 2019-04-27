import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { CreateComponent } from './pages/create/create.component';
import { RoomsRoutingModule } from './rooms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule
  ],
  declarations: [ RoomsComponent, CreateComponent ]
})
export class RoomsModule { }
