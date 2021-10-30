import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';


export const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'room/:id',
    component: RoomComponent
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  }
];