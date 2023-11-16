import { type Coordinate } from '@/types/common';

export interface SearchLoadRequest {
  stopPoints: StopPointRequest[];
  equipmentType: string;
}

export interface StopPointRequest {
  location: LocationRquest;
  radius: number;
  stopDate: StopDateRequest;
}
export interface LocationRquest {
  coordinate: Coordinate;
  city?: string;
  state?: string;
  country?: string;
}
export interface StopDateRequest {
  from?: string;
  to?: string;
}
