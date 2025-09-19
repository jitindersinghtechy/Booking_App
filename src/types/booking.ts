import { ReactNode } from "react";

export type Booking = {
  notes: any;
  carrier: any;
  tags: any;
  dateTime: any;
  id: string;
  title: string;
  from: string;
  to: string;
  date: string;   
  time: string;  
  price: string;  
  status: "Upcoming" | "Completed";
  company: string;
};
export type BookingTag = { label: string; color: string };
export type LabelTag = { label: string; color: string };

export type Bookingcard = {
  confirmTextBold: ReactNode;
  confirmTime: ReactNode;
  highlight: any;
  flight: string;
  stop: string;
  title: string;
  date: string;
  from: string;
  to: string;
  price: string;
  tags: BookingTag[];
  label: LabelTag[];
};

export type BookingDetailScreenProps = {
  booking: {
    id: string | number;
    date: string;
    duration?: string;
    status: 'OPEN' | 'COMPLETED' | 'CANCELLED';
    price: number;
    title: string;
    passengers: number;
    luggage: number;
    instructions: string;
    details: {
      label: string;
      value: string;
      checkboxKey: string;
    }[];
    babySeat?: {
      count: number;
      ages: string;
      checkboxKey: string;
    };
    customer: {
      name: string;
      checkboxKey: string;
    };
    comment?: {
      text: string;
      checkboxKey: string;
    };
    singboardFilename?: string;
    onSingboardPress?: () => void;
  };
};

export type DetailItem = {
  label: string;
  value: string;
  checkboxKey: string;
};

export type BabySeat = {
  count: number;
  ages: string;
  checkboxKey: string;
};

export type Customer = {
  name: string;
  checkboxKey: string;
};

export type Comment = {
  text: string;
  checkboxKey: string;
};

export type Bookings = {
  id: string;
  date: string; 
  dayOfWeek?: string; 
  duration?: string;
  status: 'OPEN' | string;
  price: number;
  currencySymbol?: string; 
  title: string; 
  passengers: number;
  luggage: number;
  instructions: string;
  time?: string; 
  from?: string; 
  stop?: string; 
  to?: string; 
  flight?: string; 
  details: DetailItem[];
  babySeat?: BabySeat;
  customer?: Customer;
  comment?: Comment;
  singboardFilename?: string;
  onSingboardPress?: () => void;
};