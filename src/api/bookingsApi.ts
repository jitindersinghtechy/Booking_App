import axios from 'axios';
import { Booking } from '../types/booking';
import bookingsData from '../assets/bookings.json';


export async function fetchBookings(): Promise<Booking[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(bookingsData.booking as unknown as Booking[]), 500);
    });
}

export async function fetchMybooking(): Promise<Booking[]> {

    return new Promise((resolve) => {
        setTimeout(() => resolve(bookingsData.active as unknown as Booking[]), 500);
    });
}