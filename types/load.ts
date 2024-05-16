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
  notes: string;
}

export interface LoadBase {
  amount: number;
  broker: BrokerName;
  currency: string;
  deliveryStop: Stop;
  destinationDeadhead?: number;
  distance: number;
  distanceUnit: string;
  driveDistance: number;
  duration: number;
  durationUnit: 'seconds' | 'minutes' | 'hours';
  equipmentType: string;
  flyDistance: number;
  height: number;
  heightUnit: string;
  keyByPoints: string;
  length: number;
  lengthUnit: string;
  loadDetails?: any;
  loadId: string;
  originDeadhead?: number;
  pickupStop: Stop;
  rate: number;
  rawLoad: any;
  stopPoints: Stop[];
  stops: Stop[];
  weight: number;
  weightUnit: string;
  width: number;
  widthUnit: string;

  deadheadRate?: number;
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

export interface LoadPoint {
  keyPoints: string;
  fromPoint: number[];
  toPoint: number[];
}
