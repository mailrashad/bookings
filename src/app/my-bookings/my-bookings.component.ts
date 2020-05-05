import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { Bookings } from '../models/availability';
import { IAppState } from '../store';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnDestroy{
  selectedUserId: string;
  @select() bookings: Observable<Bookings[]>;
  allBookings: Bookings[] = [];
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>) {
    this.selectedUserId = this.route.snapshot.queryParamMap.get('user');

    this.subscription = this.bookings.subscribe( bookings => this.allBookings = bookings);
    this.sortArray(this.allBookings);

  }

cancelBooking(booking: Bookings){
  this.ngRedux.dispatch({type: 'CANCEL_SLOT', availabilityId: booking.availabilityId, room: booking.roomName});
}

sortArray(bookingsArray: Bookings[]){
  bookingsArray.sort((a, b) => (a.availabilityId > b.availabilityId) ? 1 : -1);
}

ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
