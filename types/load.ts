import { type BrokerName, type Coordinate } from '@/types/common';

export interface Stop {
  address?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  countryCode?: string;
  postalCode?: string;
  coordinates: Coordinate;
  appointment: {
    startTime?: string;
    endTime?: string;
  };
}

export interface LoadBase {
  broker: BrokerName;
  loadId: string;
  pickupStop: Stop;
  deliveryStop: Stop;
  rate: number;
  deadheadRate?: number;
  amount: number;
  currency: string;
  distance: number;
  distanceUnit: string;
  duration: number;
  durationUnit: 'seconds' | 'minutes' | 'hours';
  originDeadhead?: number;
  destinationDeadhead?: number;
  rawLoad: any;
  truckCompanyName: string;
  truckCompanyEmail: string;
  truckCompanyPhone: string;
  truckCompanyFax: string;
  shipperInfo: ShipperInfo;
  metadata?: Metadata;
}

export interface ShipperInfo {
  name?: string;
  phone?: string;
  fax?: string;
  email?: string;
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
