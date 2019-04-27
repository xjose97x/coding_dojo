import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/shared/models/room.model';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomService, private store: Store) { }

  rooms: Room[];

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(r => {
      this.rooms = r;
    });
  }

  canEdit(room: Room): boolean {
    return this.store.selectSnapshot<string>(AppState.email) === room.creator.email;
  }

  canJoin(room: Room): boolean {
    const email = this.store.selectSnapshot<string>(AppState.email);
    if (email === room.creator.email) {
      return true;
    }
    if (room.members.some(e => e.email === email)) {
      return true;
    }

    return false;
  }
}
