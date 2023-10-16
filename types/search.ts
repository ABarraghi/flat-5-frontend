export interface SearchForm {
  locations: Locations;
}

export interface Locations {
  source: LocationBase;
  destination: LocationBase;
  returnToOrigin: boolean;
}

export interface LocationBase {
  address: string;
  startDate: string;
  endDate: string;
  radius: string;
}
