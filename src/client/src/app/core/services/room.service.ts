import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Room } from 'src/app/shared/models/room.model';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) { }

  createRoom(name: string, members: string[]) {
    return this.http.post(`${environment.backendEndpoint}/room`, {name, members})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error);
        })
      );
  }

  getAllRooms() {
    return this.http.get<Room[]>(`${environment.backendEndpoint}/room`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err.error);
        })
      );
  }

  getRoomById(id: string) {
    return this.http.get<Room>(`${environment.backendEndpoint}/room/${id}`)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err.error);
      })
    );
  }
}
