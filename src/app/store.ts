import { tassign } from 'tassign';

import { Availability, Bookings } from './models/availability';

export interface IAppState{
    availability: Availability[];
    bookings: Bookings[];
}

export const INITIAL_STATE: IAppState = {
    availability: [ ],
    bookings: [ ]
};


function addData(state, action){

    const array: Availability[] = [];
    for (let i = 0; i < 8; i++){
        const x = action.date.setHours(10 + i, 0, 0, 0);
        const check = state.availability.filter(j => j.id === x && j.roomName === action.room);
        if (check.length) { break; }
        array.push({roomName: action.room,
        startTime: x,
        booked: false,
        duration: 60,
        id: x });
    }
    return tassign(state, {availability: state.availability.concat(array)});
}

function bookSlot(state, action){
    const reqdSlot = state.availability.find(i => (i.id === action.id && i.roomName === action.room));
    const index = state.availability.indexOf(reqdSlot);
    const newBooking = {availabilityId: action.id, userId: action.userId, roomName: action.room};
    return tassign(state, {
        availability: [...state.availability.slice(0, index),
        tassign(reqdSlot, {booked: true}), ...state.availability.slice(index + 1)],

        bookings: state.bookings.concat(newBooking)
    });
}

function cancelSlot(state, action){
    const reqdSlot = state.availability.find(i => i.id === action.availabilityId && i.roomName === action.room);
    const index = state.availability.indexOf(reqdSlot);
    return tassign(state, {
        availability: [...state.availability.slice(0, index),
        tassign(reqdSlot, {booked: false}), ...state.availability.slice(index + 1)],

        bookings: state.bookings.filter(i => !(i.availabilityId === action.availabilityId && i.roomName === action.room))
    });
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type){
        case 'ADD_DATA': return addData(state, action);
        case 'BOOK_SLOT': return bookSlot(state, action);
        case 'CANCEL_SLOT': return cancelSlot(state, action);
    }
    return state;
}
