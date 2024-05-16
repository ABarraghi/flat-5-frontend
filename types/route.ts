import { type LoadBase, type Stop } from '@/types/load';

export type RouteType = 'standard' | 'enRoute' | 'routeMyTruck';

export interface RouteInfo {
  amount?: number;
  brokers?: string[];
  currency?: string;
  deadhead?: number;
  description?: string;
  differInfo?: {
    distance?: number;
    duration?: number;
    distanceUnit?: string;
    durationUnit?: string;
    amount?: number;
    currency?: string;
    description?: string;
    returnAt?: string;
    deadhead?: number;
    deadheadUnit?: string;
    directions?: string;
    brokers?: string[];
  };
  directions?: string;
  distance?: number;
  distanceUnit?: string;
  driveDistance?: string;
  duration?: number;
  durationUnit?: string;
  flyDistance?: number;
  id: string;
  loads?: LoadBase[];
  returnAt?: string;
  stopPoints?: Stop[];
  type: RouteType;
}
