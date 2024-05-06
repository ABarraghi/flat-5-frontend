export type BrokerName = 'coyote' | 'dat' | 'truck_stop';

export interface Coordinate {
  latitude: number;
  longitude: number;
}
export const UpperCaseAlphabet: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export interface MapLocation {
  address: string;
  coordinate: Coordinate;
  title: string;
  radius: number;
}
