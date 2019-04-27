import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/shared/models/room.model';
import { Store } from '@ngxs/store';
import { AppState } from 'src/app/core/state/app.state';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  room: Room;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private store: Store) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomService.getRoomById(params['id']).subscribe(room => this.room = room);
    });
  }

  isCreator(): boolean {
    return this.store.selectSnapshot<string>(AppState.email) === this.room.creator.email;
  }

  startMeeting() {
    return alert('Meeting started by Creator!');
  }
}
