import { type BrokerName, type Coordinate } from '@/types/common';

export interface Stop {
  address: any;
  coordinates: Coordinate;
  appointment: {
    appointmentStartDateTimeUtc: string;
    appointmentEndDateTimeUtc: string;
  };
}

export interface LoadBase {
  broker: BrokerName;
  loadId: string;
  pickupStop: Stop;
  deliveryStop: Stop;
}

export interface Route {
  id: string;
  totalAmount: number;
  totalDistance: number;
  loads: LoadBase[];
  isSelected?: boolean;
}
