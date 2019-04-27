import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommonValidators } from 'src/app/shared/validators/common.validators';
import { RoomService } from 'src/app/core/services/room.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngxs/store';
import { ToggleLoading } from 'src/app/core/state/app.state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private toastService: ToastrService,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  createRoomForm = this.fb.group({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    members: ['', [Validators.required, CommonValidators.commaSepEmail]]
  });

  // convenience getter for easy access to form fields
  get f(): any { return this.createRoomForm.controls; }

  onSubmit() {
    const val = this.createRoomForm.value;
    this.store.dispatch(new ToggleLoading()).subscribe();
    this.roomService.createRoom(val.name, val.members).subscribe(
      _success => {
        this.toastService.success('Room created successfully');
        this.store.dispatch(new ToggleLoading()).subscribe();
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      (error: string) => {
        this.store.dispatch(new ToggleLoading()).subscribe();
        this.toastService.error(error, 'Login');
      }
    );
  }

}
