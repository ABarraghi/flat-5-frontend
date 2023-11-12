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
  metadata: Metadata;
}

export interface Metadata {
  estimationDistance: number;
  estimationDurations: number;
  estimationAmount: number;
  name: string;
  email: string;
  fax: string;
  phone: string;
}

export interface Route {
  id: string;
  totalAmount: number;
  totalDistance: number;
  loads: LoadBase[];
  isSelected?: boolean;
}
