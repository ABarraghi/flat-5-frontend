import { type BrokerName, type Coordinate } from '@/types/common';
import { type Stop, type LoadBase } from './load';
import { type RouteInfo } from './route';

export interface SearchLoadRequest {
  stopPoints: StopPointRequest[];
  equipmentType: string;
  brokers: string[];
  isReturnOrigin: boolean;
}

export interface StopPointRequest {
  location: LocationRequest;
  radius: number;
  stopDate: StopDateRequest;
  hadLoad: boolean;
}

export interface LocationRequest {
  coordinates: Coordinate;
  city?: string;
  state?: string;
  country?: string;
}

export interface StopDateRequest {
  from?: string;
  to?: string;
}

export interface BookLoadRequest {
  broker: BrokerName;
  loadId: string;
  loadData?: RouteInfo;
}

export interface CoyoteBookLoadRequest {
  carrierId?: string;
  load: LoadBase;
  stops: Stop[];
}
