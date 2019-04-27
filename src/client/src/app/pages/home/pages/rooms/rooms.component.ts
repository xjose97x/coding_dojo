import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/shared/models/room.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  rooms: Room[];

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(r => {
      this.rooms = r;
    })
  }

}
