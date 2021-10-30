import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/classes/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  public logo = 'https://res.cloudinary.com/whims-inc/image/upload/v1634691221/Whims%20Inc/icon-color_t1knbr.png';

  public usertTypes = [
    { alias: 'viewer', name: 'Observador' },
    { alias: 'player', name: 'Participante' },
  ];
  public cardTypes = [
    { id: 1, name: 'Fibonacci', cards: [1, 2, 3, 5, 8, 13, 21, 34] },
    { id: 2, name: 'Horas', cards: [1, 2, 3, 4, 5, 6, 7, 8] },
  ];
  public cards: Array<any> = [];

  public myRoom = new Room();

  public me = { id: '', name: localStorage.userName || '', type: 'player', vote: null };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) { }

  public ngOnInit() {
    this.route.params.subscribe(async (params: any) => {
      this.myRoom.id = params['id'];
      this.roomService.join(this.myRoom.id, this.me).then(roomData => {
        this.roomChanged(roomData);
        this.initRoom();
      }).catch(err => {
        this.router.navigateByUrl(`/home`);
      });
    });
  }

  public initRoom() {
    this.roomService.socket.on('room:changed', (roomData: any) => this.roomChanged(roomData));
  }

  public roomChanged(roomData: any) {
    this.myRoom = roomData;

    this.me = this.myRoom.users.find(u => u.id == this.roomService.getMyId());

    if (this.myRoom.owner === this.me.id) {
      this.me.type = 'admin';
      this.usertTypes = [{ alias: 'admin', name: 'Admin' }];
    }

    this.cards = this.cardTypes.find(c => c.id === this.myRoom.cardTypeId)?.cards || [];
  }

  public toogleVotes() {
    this.myRoom.showVotes = !this.myRoom.showVotes;
    if (!this.myRoom.showVotes) {
      this.myRoom.average = 0;
      this.myRoom.users.map(u => u.vote = null);
    }
    this.roomService.changeRoom(this.myRoom);
  }

  public toogleCardType() {
    this.roomService.changeRoom(this.myRoom);
  }

  public changeUserName() {
    this.roomService.changeMe(this.me);
  }

  public changeRoomName() {
    this.roomService.changeRoom(this.myRoom);
  }

  public changeVote(vote: any) {
    if (!this.myRoom.showVotes) {
      this.me.vote = vote;
      this.roomService.changeMe(this.me);
    }
  }
}
