import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';

import { IAppState } from '../store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  selectedUserId: string;
  rooms = ['Room 1', 'Room 2', 'Room 3'];

  constructor(private ngRedux: NgRedux<IAppState>, private route: ActivatedRoute) {
    this.selectedUserId = this.route.snapshot.queryParamMap.get('user') || 'USER 1';
   }

  selectUser(user: HTMLSelectElement){
    this.selectedUserId = user.value;
  }


}
