import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { HomeComponent } from './pages/home/home.component';
import { RoomComponent } from './pages/room/room.component';
import { RoomService } from './services/room.service';

const config: SocketIoConfig = {
  url: environment.apiUrl,
  options: {
    transports: ['websocket']
  }
};

const pages: Array<any> = [
  HomeComponent,
  RoomComponent,
];

const components: Array<any> = [];

const services: Array<any> = [
  RoomService,
];


@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    ...services,
  ],
  bootstrap: [
    AppComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }
