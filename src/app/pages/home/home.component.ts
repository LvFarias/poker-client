import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // public name = localStorage.userName || '';
  // public roomId = '';
  // public roomName = '';

  // constructor(
  //   private router: Router,
  //   private roomService: RoomService,
  // ) {
  //   this.roomService.leave();
  // }

  // public createRoom() {
  //   localStorage.userName = this.name;
  //   this.roomService.create(this.roomName, this.name).then(roomData => {
  //     this.router.navigateByUrl(`/room/${roomData.id}`);
  //   });
  // }

  // public singIn() {
  //   localStorage.userName = this.name;
  //   this.router.navigateByUrl(`/room/${this.roomId}`);
  // }
}
