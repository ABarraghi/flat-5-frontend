import { type LoadBase } from '@/types/load';

export type RouteType = 'standard' | 'enRoute' | 'routeMyTruck';

export interface RouteInfo {
  id: string;
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
  type: RouteType;
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
  loads?: LoadBase[];
  isSelected?: boolean;
}
