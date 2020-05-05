export class Availability{
    roomName: string;
    startTime: Date;
    booked: boolean;
    duration: number;
    id: string;
}

export class Bookings{
    roomName: string;
    availabilityId: string;
    userId: string;
}


