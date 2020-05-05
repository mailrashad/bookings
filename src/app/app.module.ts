import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayAvailabilityComponent } from './display-availability/display-availability.component';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { IAppState, INITIAL_STATE, rootReducer } from './store';


@NgModule({
  declarations: [
    AppComponent,
    DisplayAvailabilityComponent,
    HomeComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    RouterModule.forRoot([
      {path: 'home/:roomName', component: DisplayAvailabilityComponent},
      {path: 'home', component: HomeComponent},
      {path: 'bookings', component: MyBookingsComponent }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension){
    const enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}
