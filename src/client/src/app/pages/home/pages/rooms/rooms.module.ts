import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { CreateComponent } from './pages/create/create.component';
import { RoomsRoutingModule } from './rooms-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    RoomsRoutingModule
  ],
  declarations: [ RoomsComponent, CreateComponent ]
})
export class RoomsModule { }
