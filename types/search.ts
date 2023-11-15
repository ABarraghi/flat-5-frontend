import { type Coordinate } from '@/types/common';

export interface SearchForm {
  freights: FreightBase[];
  returnToOrigin: boolean;
  routeOption: string;
  equipmentTypes?: EquipmentType[];
  specialNotes?: SpecialNote[];
  shipmentFormats?: ShipmentFormat[];
}

export interface Locations {
  source?: LocationBase;
  destination?: LocationBase;
}

export interface RangeDate {
  from: string;
  to: string;
}

export interface FreightBase {
  title: string;
  location: LocationBase;
  radius: number;
  stopDate: RangeDate | null;
}

export interface LocationBase {
  title: string;
  address?: string;
  coordinate?: Coordinate;
  postCode: string;
  country: string;
  state: string;
  city: string;
  radius: number;
}

export interface TagBase {
  id: string;
  title: string;
}

export type EquipmentType = TagBase;
export type SpecialNote = TagBase;
export type ShipmentFormat = TagBase;

export const EQUIPMENT_TYPES = [
  {
    id: 'dry_van',
    title: 'Dry Van',
  },
  {
    id: 'reefer',
    title: 'Reefer',
  },
  {
    id: 'flatbed',
    title: 'Flatbed',
  },
  {
    id: 'dry_van_or_reefer',
    title: 'Van or Reefer',
  },
  {
    id: 'flat_or_van',
    title: 'Flatted or Van',
  },
];

export const SPECIAL_NOTES = [
  {
    id: 'oversized_overweight_cargo',
    title: 'Oversized/Overweight Cargo',
  },
  {
    id: 'white_glove_service',
    title: 'White Glove Service',
  },
  {
    id: 'refrigerated',
    title: 'Refrigerator',
  },
  {
    id: 'expedited_shipping',
    title: 'Expedited Shipping',
  },
  {
    id: 'hazardous_materials',
    title: 'Hazardous Materials (Hazmat) Transportation',
  },
  {
    id: 'drayage_services',
    title: 'Drayage Services',
  },
  {
    id: 'drop_trailer',
    title: 'Drop trailer',
  },
];

export const SHIPMENT_FORMATS = [
  {
    id: 'palletized',
    title: 'Palletized',
  },
  {
    id: 'floor_loaded',
    title: 'Floor Loaded',
  },
];
