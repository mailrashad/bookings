import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Availability, Bookings } from '../models/availability';
import { IAppState } from '../store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'display-availability',
  templateUrl: './display-availability.component.html',
  styleUrls: ['./display-availability.component.scss']
})
export class DisplayAvailabilityComponent implements OnInit{

  @select() availability: Observable<Availability[]>;
  @select() selectedDate;
  @select() bookings: Observable<Bookings[]>;
  days = [{day: 'Mon', id: 1}, {day: 'Tue', id: 2}, {day: 'Wed', id: 3}, {day: 'Thu', id: 4},
          {day: 'Fri', id: 5}, {day: 'Sat', id: 6}, {day: 'Sun', id: 0} ];
  selected: Date;
  selectedUserId: string;
  daysRange: Date[] = [];
  daysRangeLength;
  todaysDate: Date = new Date();
  room;

  constructor(private ngRedux: NgRedux<IAppState>, private  route: ActivatedRoute ){}

ngOnInit() {
   this.selectedUserId = this.route.snapshot.queryParamMap.get('user');
   this.room = this.route.snapshot.paramMap.get('roomName');

   this.updateView(new Date(), 0, 0);
   this.changeDateSelection(new Date());
}

changeDateSelection(viewDate){
  this.selected = viewDate;
  this.addData(this.selected);
}

addData(date: Date){
this.ngRedux.dispatch({type: 'ADD_DATA', date, room: this.room});
}

updateView(date: Date, value: number, changeMonth: number) {

  if (changeMonth !== 0){
    date.setMonth(value + changeMonth);
    date.setDate(1);
    value = 0;
  }
  this.daysRange = [];
  const x = date;
  let weekDay = x.getDay();
  if (weekDay === 0) { weekDay = 7; }
  const monthDate = x.getDate();
  let startDate = monthDate - weekDay + 1 + value;
  if (startDate <= 0){ startDate = 1; }

  for (let i = 0; i < 7; i++) {
      this.daysRange.push(new Date(x.setDate(startDate + i)));
      if ( i > 0 && ((x.getDate() === 1) || (x.getDay() === 1))) {
          this.daysRange.splice(i, 1);
          break;  }
  }
  this.daysRangeLength = this.daysRange.length - 1;
}

nextDate(lastDate){
  const daysInMonth = new Date(lastDate.getYear(), lastDate.getMonth() + 1, 0).getDate();
  if (lastDate.getDate() === daysInMonth) { return 0; }
  this.updateView(lastDate, 7, 0);
}

previousDate(firstDate){
  if (firstDate.getDate() === 1) { return 0; }
  this.updateView(firstDate, -7, 0);
}

nextMonth(date){
  const month = date.getMonth();
  this.updateView(date, month, 1);
}

previousMonth(date){
  const month = date.getMonth();
  this.updateView(date, month, -1);
}

bookSlot(x: Availability){
  if (confirm('Confirm Booking:' + new Date(x.startTime)))
  { this.ngRedux.dispatch({type: 'BOOK_SLOT', id: x.id, userId: this.selectedUserId, room: this.room}); }
}

cancelBooking(x: Availability){
  if (confirm('Cancel Booking:' + new Date(x.startTime)))
  {
    this.ngRedux.dispatch({type: 'CANCEL_SLOT', availabilityId: x.id, room: this.room});
  }
}

checkIfBookedByMe(x: Availability, bookings: Bookings[]){
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].availabilityId === x.id && bookings[i].roomName === this.room && bookings[i].userId === this.selectedUserId)
      { return true; }
  }
  return false;
}

}
